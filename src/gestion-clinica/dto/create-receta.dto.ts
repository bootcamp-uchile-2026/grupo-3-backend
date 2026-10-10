import { ApiProperty } from '@nestjs/swagger';

export class CreateRecetaDto {
  @ApiProperty({ description: 'Dosis del producto', example: '1/2 tableta' })
  dosis: string;

  @ApiProperty({
    description: 'Frecuencia de administración',
    example: 'Cada 12 horas',
  })
  frecuencia: string;

  @ApiProperty({ description: 'Duración del tratamiento', example: '5 días' })
  duracion: string;

  @ApiProperty({
    description: 'ID de la consulta asociada',
    example: 'consulta-123',
  })
  consultaId: string;

  @ApiProperty({
    description: 'Lista de IDs de productos prescritos en la receta',
    type: [String],
    example: ['prod-abc'],
  })
  productosPrescritosIds: string[];
}
