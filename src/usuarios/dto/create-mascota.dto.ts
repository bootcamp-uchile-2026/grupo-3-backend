import { ApiProperty } from '@nestjs/swagger';

export class CreateMascotaDto {
  @ApiProperty({ description: 'Nombre de la mascota', example: 'Firulais' })
  nombre: string;

  @ApiProperty({ description: 'Especie de la mascota', example: 'Perro' })
  especie: string;

  @ApiProperty({ description: 'Raza de la mascota', example: 'Pastor Alemán' })
  raza: string;

  @ApiProperty({ description: 'Fecha de nacimiento', example: '2020-05-15' })
  fechaNacimiento: string | Date;

  @ApiProperty({ description: 'Edad de la mascota en años', example: 6 })
  edad: number;

  @ApiProperty({ description: 'Peso de la mascota en kg', example: 25.5 })
  peso: number;

  @ApiProperty({ description: 'Sexo de la mascota', example: 'Macho' })
  sexo: string;

  @ApiProperty({
    description: 'URL de la foto de la mascota',
    example: 'http://example.com/foto.jpg',
  })
  foto: string;

  @ApiProperty({
    description: 'ID del dueño de la mascota',
    example: 'duenio-123',
  })
  duenioId: string;
}
