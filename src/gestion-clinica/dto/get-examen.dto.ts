import { ApiProperty } from '@nestjs/swagger';

export class GetExamenDto {
  @ApiProperty({
    description: 'Identificador único del examen',
    example: 'examen-123',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre o tipo de examen (ej. Hemograma, Ecografía)',
    example: 'Hemograma completo',
  })
  nombreExamen: string;

  @ApiProperty({
    description: 'Resultado en texto del examen',
    example: 'Glóbulos rojos normales. Ligera anemia.',
    required: false,
  })
  resultado?: string;

  @ApiProperty({
    description: 'Estado del examen (ej. Pendiente, Completado)',
    example: 'Completado',
  })
  estado: string;

  @ApiProperty({
    description: 'ID de la orden de examen a la que pertenece',
    example: 'orden-123',
  })
  ordenId: string;
}
