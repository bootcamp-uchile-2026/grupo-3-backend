import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRecetaDto {
  @ApiProperty({ description: 'Dosis del producto', example: '1/2 tableta' })
  @IsString({ message: 'La dosis debe ser un texto' })
  @IsNotEmpty({ message: 'La dosis no puede estar vacía' })
  dosis: string;

  @ApiProperty({
    description: 'Frecuencia de administración',
    example: 'Cada 12 horas',
  })
  @IsString({ message: 'La frecuencia debe ser un texto' })
  @IsNotEmpty({ message: 'La frecuencia no puede estar vacía' })
  frecuencia: string;

  @ApiProperty({ description: 'Duración del tratamiento', example: '5 días' })
  @IsString({ message: 'La duración debe ser un texto' })
  @IsNotEmpty({ message: 'La duración no puede estar vacía' })
  duracion: string;

  @ApiProperty({
    description: 'ID de la consulta asociada',
    example: 'consulta-123',
  })
  @IsString({ message: 'El ID de la consulta debe ser un texto' })
  @IsNotEmpty({ message: 'El ID de la consulta no puede estar vacío' })
  consultaId: string;

  @ApiProperty({
    description: 'Lista de IDs de productos prescritos en la receta',
    type: [String],
    example: ['prod-abc'],
  })
  @IsArray({ message: 'Los productos prescritos deben ser una lista' })
  @ArrayMinSize(1, { message: 'La receta debe incluir al menos un producto' })
  @IsString({ each: true, message: 'Cada ID de producto debe ser un texto' })
  productosPrescritosIds: string[];
}
