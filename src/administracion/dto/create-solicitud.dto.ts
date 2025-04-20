// src/administracion/dto/create-solicitud.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { DestinatarioNotificacion } from '../../Complementos/enum.Notificacion';

export class CreateSolicitudDto {
  @ApiProperty({
    description: 'Título de la solicitud',
    example: 'Solicitud de reparación',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descripción detallada de la solicitud',
    example: 'Necesito reparación de la canilla del baño principal que gotea constantemente',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Destinatarios de la solicitud',
    enum: DestinatarioNotificacion,
    default: DestinatarioNotificacion.ADMIN,
  })
  @IsEnum(DestinatarioNotificacion)
  destinatarios: DestinatarioNotificacion;

  @ApiProperty({
    description: 'ID del usuario que envía la solicitud',
    example: '48ed84bb-4483-4171-995a-6977c56153f6',
  })
  @IsUUID()
  @IsNotEmpty()
  solicitanteId: string;

  @ApiProperty({
    description: 'Tipo de usuario que envía la solicitud (propietario, inquilino, etc.)',
    example: 'inquilino',
  })
  @IsString()
  @IsOptional()
  tipoSolicitante?: string;
}