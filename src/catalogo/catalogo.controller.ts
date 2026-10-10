import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CatalogoService } from './catalogo.service';
import { GetProductoDto } from './dto/get-producto.dto';
import { GetServicioDto } from './dto/get-servicio.dto';

@ApiTags('Catálogo - General')
@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todo el catálogo (productos y servicios)' })
  findAll(): (GetProductoDto | GetServicioDto)[] {
    return this.catalogoService.findAll();
  }

  @Get('categorias')
  @ApiOperation({ summary: 'Obtener categorías y especies destacadas para el Home' })
  findCategorias() {
    return this.catalogoService.findCategoriasDestacadas();
  }

  @Get('compatible')
  @ApiOperation({
    summary: 'Obtener catálogo filtrado por compatibilidad de la mascota',
  })
  @ApiQuery({
    name: 'especie',
    required: true,
    description: 'Especie de la mascota (ej. Perro, Gato)',
  })
  @ApiQuery({
    name: 'edad',
    required: true,
    type: Number,
    description: 'Edad de la mascota en años',
  })
  findCompatible(
    @Query('especie') especie: string,
    @Query('edad') edad: string,
  ): (GetProductoDto | GetServicioDto)[] {
    const ageNum = parseFloat(edad) || 0;
    return this.catalogoService.findAllCompatible(especie, ageNum);
  }
}
