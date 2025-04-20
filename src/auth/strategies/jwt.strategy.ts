import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private supabase: SupabaseClient,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret_for_dev',
    });
  }

  async validate(payload: any) {
    const { sub: IdUser } = payload;

    const { data: user, error } = await this.supabase
      .from('user')
      .select('*')
      .eq('IdUser', IdUser)
      .single();

    if (error || !user) {
      throw new UnauthorizedException('Usuario no válido');
    }

    const { Password, ...result } = user;
    return result;
  }
}