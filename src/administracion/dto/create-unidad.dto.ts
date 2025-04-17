// src/administracion/dto/create-unidad.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateUnidadDto {
  @ApiProperty({
    description: 'Dirección o número de la unidad',
    example: 'Casa 23 - Lote 45',
  })
  @IsNotEmpty()
  @IsString()
  Adress: string;

  @ApiProperty({
    description: 'ID del propietario',
    example: '9f7b5c2d-3a1e-4f8c-9d2b-6c8d7e9f3a2b',
  })
  @IsNotEmpty()
  @IsUUID()
  propietarioId: string;

  @ApiPropertyOptional({
    description: 'ID del inquilino (opcional)',
    example: '8e6a4d1c-2b0f-3e7d-8c1a-5b7c6d8e9f0a',
  })
  @IsOptional()
  @IsUUID()
  inquilinoId?: string;
}