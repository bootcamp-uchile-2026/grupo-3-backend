import { ApiProperty } from '@nestjs/swagger';

export class GetMascotaDto {
  @ApiProperty({
    description: 'Identificador único de la mascota',
    example: 'mascota-123',
  })
  id: string;

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
    description: 'Fecha de nacimiento',
    example: '2020-05-15T00:00:00.000Z',
  })
  fechaNacimiento: Date;

  @ApiProperty({
    description: 'Edad calculada de la mascota en años',
    example: 6,
  })
  edad: number;

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
