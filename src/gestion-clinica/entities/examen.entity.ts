import { ApiProperty } from '@nestjs/swagger';

export class Examen {
  @ApiProperty({ description: 'Identificador único del examen' })
  id: string;

  @ApiProperty({
    description: 'Nombre o tipo de examen (ej. Hemograma, Ecografía)',
  })
  nombreExamen: string;

  @ApiProperty({
    description: 'Resultado en texto del examen',
    required: false,
  })
  resultado?: string;

  @ApiProperty({ description: 'Estado del examen (ej. Pendiente, Completado)' })
  estado: string;

  @ApiProperty({ description: 'ID de la orden de examen a la que pertenece' })
  ordenId: string;
}
