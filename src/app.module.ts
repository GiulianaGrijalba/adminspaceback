import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import typeormConfig from './config/typeorm';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';



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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
