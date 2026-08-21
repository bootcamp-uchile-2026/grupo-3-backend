import { ApiProperty } from '@nestjs/swagger';

export class OrdenExamen {
  @ApiProperty({ description: 'Identificador único de la orden de examen' })
  id: string;

  @ApiProperty({ description: 'Fecha de emisión de la orden' })
  fechaEmision: Date;

  @ApiProperty({ description: 'ID de la consulta a la que pertenece la orden' })
  consultaId: string;
}
