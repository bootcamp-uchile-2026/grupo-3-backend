import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateResenaDto {
  @ApiProperty({ description: 'ID del usuario autor', example: 'usr-123' })
  @IsString({ message: 'El ID del usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío' })
  usuarioId: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Carlos Izquierdo' })
  @IsString({ message: 'El nombre del usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del usuario no puede estar vacío' })
  nombreUsuario: string;

  @ApiProperty({ description: 'Calificación dada de 1 a 5 estrellas', example: 5 })
  @IsInt({ message: 'La calificación debe ser un número entero' })
  @Min(1, { message: 'La calificación mínima es 1' })
  @Max(5, { message: 'La calificación máxima es 5' })
  calificacion: number;

  @ApiProperty({ description: 'Título de la reseña', example: 'Buena relación precio-calidad' })
  @IsString({ message: 'El título debe ser un texto' })
  @Length(3, 100, { message: 'El título debe tener entre 3 y 100 caracteres' })
  titulo: string;

  @ApiProperty({
    description: 'Comentario u opinión detallada',
    example: 'El comedero cumple su función y se siente resistente.',
  })
  @IsString({ message: 'El comentario debe ser un texto' })
  @IsNotEmpty({ message: 'El comentario no puede estar vacío' })
  comentario: string;
}
