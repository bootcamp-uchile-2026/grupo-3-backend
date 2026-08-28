import { ApiProperty } from '@nestjs/swagger';

export abstract class Persona {
  @ApiProperty({ description: 'Identificador único' })
  id: string;

  @ApiProperty({ description: 'Nombre de la persona' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos de la persona' })
  apellidos: string;

  @ApiProperty({ description: 'Edad de la persona' })
  edad: number;

  @ApiProperty({ description: 'Dirección física' })
  direccion: string;

  @ApiProperty({ description: 'Correo electrónico de contacto' })
  correoElectronico: string;

  @ApiProperty({ description: 'Contraseña de la cuenta', required: false })
  password?: string;
}
