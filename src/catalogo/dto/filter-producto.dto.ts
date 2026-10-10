import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterProductoDto {
  @ApiPropertyOptional({
    description: 'Texto de búsqueda libre (nombre, descripción, marca)',
    example: 'plato',
  })
  buscar?: string;

  @ApiPropertyOptional({
    description: 'Filtro por especie de mascota',
    example: 'Gato',
  })
  especie?: string;

  @ApiPropertyOptional({
    description: 'Filtro por tipo de producto / categoría',
    example: 'Salud y bienestar',
  })
  categoria?: string;

  @ApiPropertyOptional({
    description: 'Filtro por subcategoría',
    example: 'Platos y bebederos',
  })
  subcategoria?: string;

  @ApiPropertyOptional({
    description: 'Filtro por rango de edad de la mascota',
    example: 'Adulta',
  })
  rangoEdad?: string;

  @ApiPropertyOptional({
    description: 'Filtro por material',
    example: 'Cerámica',
  })
  material?: string;

  @ApiPropertyOptional({
    description: 'Filtro por marca del producto',
    example: 'Catit',
  })
  marca?: string;

  @ApiPropertyOptional({
    description: 'Filtrar solo productos que tienen descuento u oferta',
    example: true,
  })
  enOferta?: boolean;

  @ApiPropertyOptional({
    description: 'Criterio de ordenamiento',
    enum: ['popularidad', 'precio_asc', 'precio_desc', 'calificacion'],
    example: 'popularidad',
  })
  orden?: 'popularidad' | 'precio_asc' | 'precio_desc' | 'calificacion';

  @ApiPropertyOptional({
    description: 'Cantidad máxima de productos a devolver',
    example: 12,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Desplazamiento para paginación (botón "Ver más")',
    example: 0,
  })
  offset?: number;
}
