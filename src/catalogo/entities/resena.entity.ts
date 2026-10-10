import { ApiProperty } from '@nestjs/swagger';

export class Resena {
  @ApiProperty({ description: 'Identificador único de la reseña', example: 'res-123' })
  id: string;

  @ApiProperty({ description: 'ID del producto calificado', example: 'prod-456' })
  productoId: string;

  @ApiProperty({ description: 'ID del usuario autor', example: 'usr-789' })
  usuarioId: string;

  @ApiProperty({ description: 'Nombre visible del cliente', example: 'Carlos Izquierdo' })
  nombreUsuario: string;

  @ApiProperty({ description: 'Calificación dada en estrellas (1 a 5)', example: 5 })
  calificacion: number;

  @ApiProperty({ description: 'Título de la reseña', example: 'Buena relación precio-calidad' })
  titulo: string;

  @ApiProperty({
    description: 'Comentario u opinión detallada',
    example: 'El comedero cumple su función y se siente resistente. Muy recomendable.',
  })
  comentario: string;

  @ApiProperty({ description: 'Fecha de publicación', example: '2024-09-24T12:00:00.000Z' })
  fecha: Date;
}
