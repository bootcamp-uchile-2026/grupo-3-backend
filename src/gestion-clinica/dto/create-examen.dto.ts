import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExamenDto {
  @ApiProperty({
    description: 'Nombre o tipo del examen',
    example: 'Hemograma completo',
  })
  @IsString({ message: 'El nombre del examen debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del examen no puede estar vacío' })
  nombreExamen: string;

  @ApiProperty({
    description: 'ID de la orden de examen asociada',
    example: 'orden-123',
  })
  @IsString({ message: 'El ID de la orden debe ser un texto' })
  @IsNotEmpty({ message: 'El ID de la orden no puede estar vacío' })
  ordenId: string;

  @ApiProperty({
    description: 'Resultado inicial del examen',
    example: 'Pendiente',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El resultado debe ser un texto' })
  resultado?: string;

  @ApiProperty({
    description: 'Estado inicial del examen',
    example: 'Pendiente',
  })
  @IsString({ message: 'El estado debe ser un texto' })
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  estado: string;
}
