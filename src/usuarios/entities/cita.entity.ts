import { ApiProperty } from '@nestjs/swagger';

export class AgendaCitas {
  @ApiProperty({ description: 'Identificador único de la cita' })
  id: string;

  @ApiProperty({ description: 'Fecha y hora de la cita' })
  fechaCita: Date;

  @ApiProperty({ description: 'Identificador del dueño' })
  duenioId: string;

  @ApiProperty({ description: 'Identificador del veterinario asignado' })
  veterinarioId: string;
}
