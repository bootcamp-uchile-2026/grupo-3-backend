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

  @ApiProperty({ description: 'Edad del veterinario', example: 42 })
  edad: number;

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
