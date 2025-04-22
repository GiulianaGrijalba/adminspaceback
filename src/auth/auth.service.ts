import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '../Entities/User.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { createHash } from 'crypto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private supabase: SupabaseClient,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { Email, Password } = registerDto;

    // Verificar que el usuario no exista
    const { data: existingUser, error: findError } = await this.supabase
      .from('user')
      .select('*')
      .eq('Email', Email)
      .single();

    if (findError && findError.code !== 'PGRST116') { // PGRST116 es el código cuando no se encuentra el registro
      throw findError;
    }

    if (existingUser) {
      throw new UnauthorizedException('El correo electrónico ya está registrado');
    }

    // Crear el usuario
    const hashedPassword = this.hashPassword(Password);
    const userData = {
      ...registerDto,
      Password: hashedPassword,
    };

    const { data: newUser, error: insertError } = await this.supabase
      .from('user')
      .insert(userData)
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return newUser;
  }

  

  async login(loginDto: LoginDto, res: Response): Promise<{ user: Partial<User>, accessToken: string }> {
    const { Email, Password } = loginDto;
    
    // Consulta a Supabase (asegúrate de que esté usando 'user' y no 'users')
    const { data: user, error } = await this.supabase
      .from('user')
      .select('*')
      .eq('Email', Email)
      .single();
  
    if (error || !user || user.Password !== this.hashPassword(Password)) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  
    const payload = {
      sub: user.IdUser,
      email: user.Email,
      role: user.Role
    };
    
    const token = this.jwtService.sign(payload);
    
    // Mantener la cookie para compatibilidad
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 // 1 día
    });
    
    const { Password: _, ...userWithoutPassword } = user;
    
    // Devolver también el token en la respuesta
    return {
      user: userWithoutPassword,
      accessToken: token 
    };
  }
  
  getProfile(user: any) {
    return user; // El usuario ya viene sin la contraseña gracias a la estrategia JWT
  }
  
  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }
}