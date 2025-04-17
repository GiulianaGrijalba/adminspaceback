
// src/administracion/dto/update-servicio.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsEnum, Min } from 'class-validator';
import { StatusService } from '../../Complementos/enum.StatusService';

export class UpdateServicioDto {
  @ApiPropertyOptional({
    description: 'Nombre del servicio',
    example: 'Mantenimiento piscina',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción del servicio',
    example: 'Limpieza y mantenimiento químico de la piscina',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Precio del servicio',
    example: 8000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Estado del servicio',
    enum: StatusService,
  })
  @IsOptional()
  @IsEnum(StatusService)
  status?: StatusService;
}