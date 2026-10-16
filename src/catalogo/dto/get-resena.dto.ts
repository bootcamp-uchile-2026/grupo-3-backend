import { ApiProperty } from '@nestjs/swagger';

export class GetResenaDto {
  @ApiProperty({ description: 'ID de la reseña', example: 'res-123' })
  id: string;

  @ApiProperty({ description: 'ID del producto', example: 'prod-456' })
  productoId: string;

  @ApiProperty({ description: 'ID del usuario', example: 'usr-789' })
  usuarioId: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Carlos Izquierdo' })
  nombreUsuario: string;

  @ApiProperty({ description: 'Calificación (1 a 5)', example: 5 })
  calificacion: number;

  @ApiProperty({ description: 'Título de la reseña', example: 'Buena relación precio-calidad' })
  titulo: string;

  @ApiProperty({ description: 'Comentario de la reseña', example: 'Excelente producto.' })
  comentario: string;

  @ApiProperty({ description: 'Fecha de publicación', example: '2024-09-24T12:00:00.000Z' })
  fecha: Date;
}
