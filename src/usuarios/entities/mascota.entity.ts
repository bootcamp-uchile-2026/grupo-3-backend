import { ApiProperty } from '@nestjs/swagger';

export class FichaMascota {
  @ApiProperty({ description: 'Identificador único de la mascota' })
  id: string;

  @ApiProperty({ description: 'Nombre de la mascota' })
  nombre: string;

  @ApiProperty({ description: 'Especie (ej. Perro, Gato)', required: false })
  especie?: string;

  @ApiProperty({ description: 'Raza de la mascota' })
  raza: string;

  @ApiProperty({ description: 'Fecha de nacimiento' })
  fechaNacimiento: Date;

  @ApiProperty({ description: 'Edad calculada de la mascota en años' })
  edad: number;

  @ApiProperty({ description: 'Peso de la mascota en kg', required: false })
  peso?: number;

  @ApiProperty({
    description: 'Sexo de la mascota (M/F o Macho/Hembra)',
    required: false,
  })
  sexo?: string;

  @ApiProperty({ description: 'URL de la foto de la mascota', required: false })
  foto?: string;

  @ApiProperty({ description: 'Identificador del dueño de la mascota' })
  duenioId: string;

  @ApiProperty({
    description: 'Alergias conocidas de la mascota',
    type: [String],
    required: false,
  })
  alergias?: string[];

  @ApiProperty({
    description: 'Enfermedades o condiciones médicas preexistentes',
    type: [String],
    required: false,
  })
  enfermedadesExistentes?: string[];

  @ApiProperty({
    description: 'Descripción o notas generales sobre la mascota',
    required: false,
  })
  descripcionMascota?: string;
}
