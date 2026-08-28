import { ApiProperty } from '@nestjs/swagger';

export class FichaMascota {
  @ApiProperty({ description: 'Identificador único de la mascota' })
  id: string;

  @ApiProperty({ description: 'Nombre de la mascota' })
  nombre: string;

  @ApiProperty({ description: 'Especie (ej. Perro, Gato)' })
  especie: string;

  @ApiProperty({ description: 'Raza de la mascota' })
  raza: string;

  @ApiProperty({ description: 'Fecha de nacimiento' })
  fechaNacimiento: Date;

  @ApiProperty({ description: 'Edad de la mascota en años' })
  edad: number;

  @ApiProperty({ description: 'Peso de la mascota en kg' })
  peso: number;

  @ApiProperty({ description: 'Sexo de la mascota (M/F o Macho/Hembra)' })
  sexo: string;

  @ApiProperty({ description: 'URL de la foto de la mascota' })
  foto: string;

  @ApiProperty({ description: 'Identificador del dueño de la mascota' })
  duenioId: string;
}
