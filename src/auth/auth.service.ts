import { Injectable, UnauthorizedException, Res } from '@nestjs/common'; //agregar Res
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/User.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { createHash } from 'crypto';
import { Response } from 'express' //agregar

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { Email, Password } = registerDto;

    // Verificar que el usuario no exista
    const userExists = await this.userRepository.findOne({
      where: { Email }
    });

    if (userExists) {
      throw new UnauthorizedException('El correo electrónico ya está registrado');
    }

    // Crear el usuario
    const user = this.userRepository.create({
      ...registerDto,
      Password: this.hashPassword(Password),
    });

    return this.userRepository.save(user);
  }

  //CAMBIAR ESTO
  // async login(loginDto: LoginDto): Promise<{ accessToken: string; user: Partial<User> }> {
  //   const { Email, Password } = loginDto;
  //   const user = await this.userRepository.findOne({
  //     where: { Email }
  //   });
  //   if (!user || user.Password !== this.hashPassword(Password)) {
  //     throw new UnauthorizedException('Credenciales inválidas');
  //   }
  //   const payload = { 
  //     sub: user.IdUser,
  //     email: user.Email,
  //     role: user.Role
  //   };
  //   const { Password: _, ...userWithoutPassword } = user;
  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //     user: userWithoutPassword,
  //   };
  // }




  //POR ESTO:
  async login(loginDto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ user: Partial<User> }> {
    const { Email, Password } = loginDto
    const user = await this.userRepository.findOne({
      where: { Email }
    })
    if (!user || user.Password !== this.hashPassword(Password)) {
      throw new UnauthorizedException('Credenciales inválidas')
    }
    const payload = {
      sub: user.IdUser,
      email: user.Email,
      role: user.Role
    }
    const token = this.jwtService.sign(payload)
    // ✅ Seteamos la cookie con el token
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 // 1 día
    })
    const { Password: _, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword
    }
  }

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }
}