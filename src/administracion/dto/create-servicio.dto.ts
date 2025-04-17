
// src/administracion/dto/create-servicio.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateServicioDto {
  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Mantenimiento jardín',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción del servicio',
    example: 'Corte de césped y poda de arbustos',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Precio del servicio',
    example: 5000,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'ID de la unidad asociada al servicio',
    example: '7d6e5c4b-3a2b-1c0d-9e8f-7a6b5c4d3e2f',
  })
  @IsNotEmpty()
  @IsUUID()
  unidadId: string;
}
