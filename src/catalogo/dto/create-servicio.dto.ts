import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateServicioDto {
  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Baño e Higiene Básica',
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del servicio',
    example: 'Incluye lavado de pelo, corte de uñas y limpieza de oídos',
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  descripcion: string;

  @ApiProperty({
    description: 'Proveedor o área a cargo',
    example: 'Peluquería',
  })
  @IsString({ message: 'El proveedor o área debe ser un texto' })
  @IsNotEmpty({ message: 'El proveedor o área no puede estar vacío' })
  marca: string;

  @ApiProperty({ description: 'Precio del servicio', example: 18000 })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio: number;

  @ApiProperty({
    description: 'Especie compatible (ej. Perro, Gato, Todos)',
    example: 'Perro',
  })
  @IsString({ message: 'La especie debe ser un texto' })
  @IsNotEmpty({ message: 'La especie no puede estar vacía' })
  especie: string;

  @ApiProperty({ description: 'Rango de edad compatible', example: 'Todos' })
  @IsString({ message: 'El rango de edad debe ser un texto' })
  @IsNotEmpty({ message: 'El rango de edad no puede estar vacío' })
  rangoEdad: string;

  @ApiProperty({ description: 'Descuento aplicable', example: 0 })
  @IsNumber({}, { message: 'El descuento debe ser un número' })
  @Min(0, { message: 'El descuento no puede ser negativo' })
  descuento: number;

  @ApiProperty({
    description: 'Cantidad de sesiones o duración en horas',
    example: 1,
  })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  cantidad: number;

  @ApiProperty({
    description: 'Ficha técnica del servicio',
    example: 'Duración aproximada: 1 hora y media.',
  })
  @IsString({ message: 'La ficha técnica debe ser un texto' })
  fichaTecnica: string;

  @ApiProperty({
    description: 'Consejos de salud preventivos asociados',
    example: 'Se recomienda bañar a la mascota cada 3 o 4 semanas máximo.',
  })
  @IsString({ message: 'Los consejos de salud deben ser un texto' })
  consejosSalud: string;
}
