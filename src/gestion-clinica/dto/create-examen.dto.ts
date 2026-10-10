import { ApiProperty } from '@nestjs/swagger';

export class CreateExamenDto {
  @ApiProperty({
    description: 'Nombre o tipo del examen',
    example: 'Hemograma completo',
  })
  nombreExamen: string;

  @ApiProperty({
    description: 'ID de la orden de examen asociada',
    example: 'orden-123',
  })
  ordenId: string;

  @ApiProperty({
    description: 'Resultado inicial del examen',
    example: 'Pendiente',
    required: false,
  })
  resultado?: string;

  @ApiProperty({
    description: 'Estado inicial del examen',
    example: 'Pendiente',
  })
  estado: string;
}
