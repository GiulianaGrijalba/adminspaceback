import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/User.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { createHash } from 'crypto';

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

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: Partial<User> }> {
    const { Email, Password } = loginDto;
    
    const user = await this.userRepository.findOne({
      where: { Email }
    });

    if (!user || user.Password !== this.hashPassword(Password)) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { 
      sub: user.IdUser,
      email: user.Email,
      role: user.Role
    };

    const { Password: _, ...userWithoutPassword } = user;

    return {
      accessToken: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }
}