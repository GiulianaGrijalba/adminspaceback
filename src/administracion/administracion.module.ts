import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministracionController } from './administracion.controller';
import { AdministracionService } from './administracion.service';
import { Notificaciones } from '../Entities/Notificaciones.entity';
import { Servicios } from '../Entities/Servicios.entity';
import { Solicitud } from '../Entities/Solicitud.entity';
import { Unidad } from '../Entities/Unidad.entity';
import { User } from '../Entities/User.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notificaciones,
      Servicios,
      Solicitud,
      Unidad,
      User,
    ]),
    AuthModule,
  ],
  controllers: [AdministracionController],
  providers: [AdministracionService],
})
export class AdministracionModule {}