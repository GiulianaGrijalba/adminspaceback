import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso', type: Object })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
 
 
  //agregar esto 

 async login(
  @Body() loginDto: LoginDto,
  @Res({ passthrough: true }) res: Response
) {
  return this.authService.login(loginDto, res); // El AuthService ya setea la cookie
}

@Post('logout')
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('auth_token')
  return { message: 'Sesión cerrada' }
}

@Get('me')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Obtener información del usuario autenticado' })
@ApiResponse({ status: 200, description: 'Información del usuario obtenida exitosamente' })
@ApiResponse({ status: 401, description: 'No autorizado' })
getProfile(@Req() req) {
  return this.authService.getProfile(req.user);
}
}