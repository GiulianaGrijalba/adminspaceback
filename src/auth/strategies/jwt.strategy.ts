import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../Entities/User.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret_for_dev',
    });
  }

  async validate(payload: any) {
    const { sub: IdUser } = payload;

    const user = await this.userRepository.findOne({
      where: { IdUser },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no válido');
    }

    const { Password, ...result } = user;
    return result;
  }
}