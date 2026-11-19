import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario (dueño, veterinario o admin)',
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  correoElectronico: string;

  @ApiProperty({
    description: 'Contraseña de la cuenta',
    example: 'password123',
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token JWT de acceso (también enviado en cookie HttpOnly access_token)',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Datos del usuario autenticado',
    example: {
      id: 'duenio-1',
      nombre: 'Juan',
      apellidos: 'Pérez',
      correoElectronico: 'juan.perez@example.com',
      rol: 'DUENIO',
    },
  })
  usuario: {
    id: string;
    nombre: string;
    apellidos: string;
    correoElectronico: string;
    rol: 'DUENIO' | 'VETERINARIO' | 'ADMIN';
  };
}
