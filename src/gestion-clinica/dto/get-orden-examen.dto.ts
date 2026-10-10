import { ApiProperty } from '@nestjs/swagger';

export class GetOrdenExamenDto {
  @ApiProperty({
    description: 'Identificador único de la orden de examen',
    example: 'orden-123',
  })
  id: string;

  @ApiProperty({
    description: 'Fecha de emisión de la orden',
    example: '2026-08-20T18:00:00.000Z',
  })
  fechaEmision: Date;

  @ApiProperty({
    description: 'ID de la consulta a la que pertenece la orden',
    example: 'atencion-123',
  })
  consultaId: string;
}
