import { ApiProperty } from '@nestjs/swagger';

export class GetCitaDto {
  @ApiProperty({
    description: 'Identificador único de la cita',
    example: 'cita-789',
  })
  id: string;

  @ApiProperty({
    description: 'Fecha y hora de la cita',
    example: '2026-08-25T10:00:00.000Z',
  })
  fechaCita: Date;

  @ApiProperty({ description: 'ID del dueño', example: 'duenio-123' })
  duenioId: string;

  @ApiProperty({ description: 'ID del veterinario', example: 'vet-456' })
  veterinarioId: string;
}
