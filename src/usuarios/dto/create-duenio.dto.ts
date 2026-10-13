import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Length,
  IsDateString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateDuenioDto {
  @ApiProperty({ description: 'Nombre del dueño', example: 'Juan' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del dueño', example: 'Pérez' })
  @IsString({ message: 'Los apellidos deben ser un texto' })
  @Length(2, 50, { message: 'Los apellidos deben tener entre 2 y 50 caracteres' })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del dueño (YYYY-MM-DD)',
    example: '1990-05-15',
  })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)' })
  fechaNacimiento: string | Date;

  @ApiProperty({
    description: 'Dirección física',
    example: 'Av. Providencia 1234',
  })
  @IsString({ message: 'La dirección debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  direccion: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser un email válido' })
  correoElectronico: string;

  @ApiProperty({
    description: 'Contraseña para la cuenta',
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La contraseña debe ser un texto' })
  @Length(6, 100, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;
}
