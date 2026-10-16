import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class FilterProductoDto {
  @ApiPropertyOptional({
    description: 'Texto de búsqueda libre (nombre, descripción, marca)',
    example: 'plato',
  })
  @IsOptional()
  @IsString()
  buscar?: string;

  @ApiPropertyOptional({
    description: 'Filtro por especie de mascota',
    example: 'Gato',
  })
  @IsOptional()
  @IsString()
  especie?: string;

  @ApiPropertyOptional({
    description: 'Filtro por tipo de producto / categoría',
    example: 'Salud y bienestar',
  })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiPropertyOptional({
    description: 'Filtro por subcategoría',
    example: 'Platos y bebederos',
  })
  @IsOptional()
  @IsString()
  subcategoria?: string;

  @ApiPropertyOptional({
    description: 'Filtro por rango de edad de la mascota',
    example: 'Adulta',
  })
  @IsOptional()
  @IsString()
  rangoEdad?: string;

  @ApiPropertyOptional({
    description: 'Filtro por material',
    example: 'Cerámica',
  })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiPropertyOptional({
    description: 'Filtro por marca del producto',
    example: 'Catit',
  })
  @IsOptional()
  @IsString()
  marca?: string;

  @ApiPropertyOptional({
    description: 'Filtrar solo productos que tienen descuento u oferta',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  enOferta?: boolean;

  @ApiPropertyOptional({
    description: 'Criterio de ordenamiento',
    enum: ['popularidad', 'precio_asc', 'precio_desc', 'calificacion'],
    example: 'popularidad',
  })
  @IsOptional()
  @IsIn(['popularidad', 'precio_asc', 'precio_desc', 'calificacion'])
  orden?: 'popularidad' | 'precio_asc' | 'precio_desc' | 'calificacion';

  @ApiPropertyOptional({
    description: 'Cantidad máxima de productos a devolver',
    example: 12,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Desplazamiento para paginación (botón "Ver más")',
    example: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}