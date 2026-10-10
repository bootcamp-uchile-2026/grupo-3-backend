import { ApiProperty } from '@nestjs/swagger';

export class GetRecetaDto {
  @ApiProperty({
    description: 'Identificador de la receta',
    example: 'receta-789',
  })
  id: string;

  @ApiProperty({
    description: 'Dosis del medicamento o producto',
    example: '1/2 tableta',
  })
  dosis: string;

  @ApiProperty({
    description: 'Frecuencia de administración',
    example: 'Cada 12 horas',
  })
  frecuencia: string;

  @ApiProperty({ description: 'Duración del tratamiento', example: '5 días' })
  duracion: string;

  @ApiProperty({
    description: 'Fecha de emisión de la receta',
    example: '2026-08-20T18:30:00.000Z',
  })
  fechaEmision: Date;

  @ApiProperty({
    description: 'ID de la consulta a la que pertenece',
    example: 'atencion-123',
  })
  consultaId: string;

  @ApiProperty({
    description: 'Lista de IDs de productos prescritos',
    type: [String],
    example: ['prod-abc'],
  })
  productosPrescritosIds: string[];
}
