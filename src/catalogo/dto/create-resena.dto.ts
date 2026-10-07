import { ApiProperty } from '@nestjs/swagger';

export class CreateResenaDto {
  @ApiProperty({ description: 'ID del usuario autor', example: 'usr-123' })
  usuarioId: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Carlos Izquierdo' })
  nombreUsuario: string;

  @ApiProperty({ description: 'Calificación dada de 1 a 5 estrellas', example: 5 })
  calificacion: number;

  @ApiProperty({ description: 'Título de la reseña', example: 'Buena relación precio-calidad' })
  titulo: string;

  @ApiProperty({
    description: 'Comentario u opinión detallada',
    example: 'El comedero cumple su función y se siente resistente.',
  })
  comentario: string;
}
