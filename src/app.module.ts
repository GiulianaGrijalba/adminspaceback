import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import typeormConfig from './config/typeorm';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PropietarioModule } from './propietario/propietario.module';
import { InquilinoModule } from './inquilino/inquilino.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbConfig = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!dbConfig) {
          throw new Error('TypeORM configuration not found');
        }
        return dbConfig;
      },
    }),
    AuthModule,
    AdminModule,
    PropietarioModule,
    InquilinoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
