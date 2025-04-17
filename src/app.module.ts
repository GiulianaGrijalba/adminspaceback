import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AdministracionModule } from './administracion/administracion.module';
import { InquilinoModule } from './inquilinos/inquilino.module';
import { PropietariosModule } from './Propietarios/propietarios.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbConfig = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!dbConfig) {
          throw new Error('TypeORM configuration not found');
        }
        return dbConfig;
      },
    }),

    AdministracionModule,
    InquilinoModule,
    PropietariosModule,
  ],
})
export class AppModule {}
