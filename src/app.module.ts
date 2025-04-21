import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './config/supabase.module';
import { AdministracionModule } from './administracion/administracion.module';
import { InquilinoModule } from './inquilinos/inquilino.module';
import { PropietariosModule } from './Propietarios/propietarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SupabaseModule,
    AuthModule,
    AdministracionModule,
    InquilinoModule,
    PropietariosModule,
  ],
})
export class AppModule {}