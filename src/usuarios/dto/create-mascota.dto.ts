import { ApiProperty } from '@nestjs/swagger';

export class CreateMascotaDto {
  @ApiProperty({ description: 'Nombre de la mascota', example: 'Firulais' })
  nombre: string;

  @ApiProperty({
    description: 'Especie de la mascota',
    example: 'Perro',
    required: false,
  })
  especie?: string;

  @ApiProperty({ description: 'Raza de la mascota', example: 'Pastor Alemán' })
  raza: string;

  @ApiProperty({
    description: 'Fecha de nacimiento de la mascota (ISO o YYYY-MM-DD)',
    example: '2020-05-15',
  })
  fechaNacimiento: string | Date;

  @ApiProperty({
    description: 'Peso de la mascota en kg',
    example: 25.5,
    required: false,
  })
  peso?: number;

  @ApiProperty({
    description: 'Sexo de la mascota',
    example: 'Macho',
    required: false,
  })
  sexo?: string;

  @ApiProperty({
    description: 'URL de la foto de la mascota',
    example: 'http://example.com/foto.jpg',
    required: false,
  })
  foto?: string;

  @ApiProperty({
    description: 'ID del dueño de la mascota',
    example: 'duenio-123',
  })
  duenioId: string;

  @ApiProperty({
    description: 'Alergias conocidas de la mascota',
    example: ['Polen', 'Penicilina'],
    type: [String],
    required: false,
  })
  alergias?: string[];

  @ApiProperty({
    description: 'Enfermedades o condiciones preexistentes',
    example: ['Displasia de cadera'],
    type: [String],
    required: false,
  })
  enfermedadesExistentes?: string[];

  @ApiProperty({
    description: 'Descripción o notas adicionales de la mascota',
    example: 'Es muy sociable y juguetón',
    required: false,
  })
  descripcionMascota?: string;
}
