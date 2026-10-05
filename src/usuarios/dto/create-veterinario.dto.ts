import { ApiProperty } from '@nestjs/swagger';

export class CreateVeterinarioDto {
  @ApiProperty({ description: 'Nombre del veterinario', example: 'Ana' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del veterinario', example: 'Gómez' })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del veterinario (ISO o YYYY-MM-DD)',
    example: '1985-03-20',
  })
  fechaNacimiento: string | Date;

  @ApiProperty({ description: 'Dirección física', example: 'Calle Falsa 123' })
  direccion: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'ana.gomez@example.com',
  })
  correoElectronico: string;

  @ApiProperty({
    description: 'Contraseña para la cuenta del veterinario',
    example: 'vetpass123',
  })
  password: string;

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
