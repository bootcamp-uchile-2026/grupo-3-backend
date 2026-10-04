import { ApiProperty } from '@nestjs/swagger';

export class GetVeterinarioDto {
  @ApiProperty({
    description: 'Identificador único del veterinario',
    example: 'vet-456',
  })
  id: string;

  @ApiProperty({ description: 'Nombre del veterinario', example: 'Ana' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del veterinario', example: 'Gómez' })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del veterinario',
    example: '1985-03-20T00:00:00.000Z',
  })
  fechaNacimiento: Date;

  @ApiProperty({ description: 'Dirección física', example: 'Calle Falsa 123' })
  direccion: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'ana.gomez@example.com',
  })
  correoElectronico: string;

  @ApiProperty({
    description: 'Especialidad del veterinario',
    example: 'Cardiología',
  })
  especialidad: string;
}
