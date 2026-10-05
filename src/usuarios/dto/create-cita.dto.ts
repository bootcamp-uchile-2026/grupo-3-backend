import { ApiProperty } from '@nestjs/swagger';

export class CreateCitaDto {
  @ApiProperty({
    description: 'Fecha y hora de la cita (formato ISO)',
    example: '2026-08-25T10:00:00.000Z',
  })
  fechaCita: string | Date;

  @ApiProperty({ description: 'ID del dueño', example: 'duenio-123' })
  duenioId: string;

  @ApiProperty({
    description: 'ID del veterinario seleccionado',
    example: 'vet-456',
  })
  veterinarioId: string;

  @ApiProperty({
    description: 'ID de la mascota que será atendida',
    example: 'mascota-123',
  })
  mascotaId: string;

  @ApiProperty({
    description: 'Servicios adicionales para la cita (ej. vacunas, microchip)',
    type: [String],
    example: ['Vacunas', 'Implantación de microchip'],
    required: false,
  })
  serviciosAdicionales?: string[];
}
