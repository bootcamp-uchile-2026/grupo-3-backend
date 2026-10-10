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

  @ApiProperty({
    description: 'Edad calculada del veterinario en años',
    example: 41,
  })
  edad: number;

  @ApiProperty({ description: 'Dirección física', example: 'Calle Falsa 123' })
  direccion: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'ana.gomez@example.com',
  })
  correoElectronico: string;

  @ApiProperty({
    description: 'Especialidades médicas del veterinario',
    type: [String],
    example: ['Cardiología', 'Cirugía'],
  })
  especialidad: string[];

  @ApiProperty({
    description: 'Años de experiencia laboral',
    example: 10,
    required: false,
  })
  experiencia?: number;

  @ApiProperty({
    description: 'Especies de animales que atiende',
    type: [String],
    example: ['Perros', 'Gatos', 'Aves'],
    required: false,
  })
  especieAtendida?: string[];

  @ApiProperty({
    description: 'Descripción profesional o perfil del veterinario',
    example: 'Especialista en animales pequeños con más de 10 años de experiencia',
    required: false,
  })
  descripcionVeterinario?: string;
}
