// src/administracion/dto/create-notificacion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { DestinatarioNotificacion } from '../../Complementos/enum.Notificacion';

export class CreateNotificacionDto {
  @ApiProperty({
    description: 'Título de la notificación',
    example: 'Corte de agua programado',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descripción de la notificación',
    example: 'Se realizará un corte de agua el día 15/05 de 9 a 12hs por mantenimiento',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Destinatarios de la notificación',
    enum: DestinatarioNotificacion,
    default: DestinatarioNotificacion.TODOS,
  })
  @IsEnum(DestinatarioNotificacion)
  destinatarios: DestinatarioNotificacion;
}