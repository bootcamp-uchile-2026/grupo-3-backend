import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { GetProductoDto } from './dto/get-producto.dto';
import { FilterProductoDto } from './dto/filter-producto.dto';
import { CreateResenaDto } from './dto/create-resena.dto';
import { GetResenaDto } from './dto/get-resena.dto';

@ApiTags('Catálogo - Productos')
@Controller('catalogo/productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un nuevo producto al catálogo' })
  @ApiResponse({ status: 201, type: GetProductoDto })
  create(@Body() createProductoDto: CreateProductoDto): GetProductoDto {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener productos con filtros, búsqueda, orden y paginación',
  })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  findAll(@Query() filterDto: FilterProductoDto): GetProductoDto[] {
    return this.productosService.findAll(filterDto);
  }

  @Get('ofertas')
  @ApiOperation({ summary: 'Obtener productos en oferta para la página principal' })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findOfertas(@Query('limit') limit?: number): GetProductoDto[] {
    return this.productosService.findOfertas(limit ? Number(limit) : 8);
  }

  @Get('sugeridos')
  @ApiOperation({
    summary: 'Obtener productos sugeridos para cross-selling ("¿Te faltó algo?")',
  })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findSugeridos(@Query('limit') limit?: number): GetProductoDto[] {
    return this.productosService.findSugeridos(limit ? Number(limit) : 4);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el detalle completo de un producto por ID' })
  @ApiResponse({ status: 200, type: GetProductoDto })
  findOne(@Param('id') id: string): GetProductoDto {
    return this.productosService.findOne(id);
  }

  @Get(':id/relacionados')
  @ApiOperation({ summary: 'Obtener productos relacionados para el carrusel de ficha' })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  findRelacionados(
    @Param('id') id: string,
    @Query('limit') limit?: number,
  ): GetProductoDto[] {
    return this.productosService.findRelacionados(id, limit ? Number(limit) : 4);
  }

  @Get(':id/resenas')
  @ApiOperation({ summary: 'Obtener reseñas de clientes de un producto' })
  @ApiResponse({ status: 200, type: [GetResenaDto] })
  @ApiQuery({
    name: 'filtro',
    required: false,
    description: 'Filtro: positivas, neutras, criticas, 5, 4, etc.',
  })
  findResenas(
    @Param('id') id: string,
    @Query('filtro') filtro?: string,
  ): GetResenaDto[] {
    return this.productosService.findResenas(id, filtro);
  }

  @Post(':id/resenas')
  @ApiOperation({ summary: 'Escribir una nueva reseña para un producto' })
  @ApiResponse({ status: 201, type: GetResenaDto })
  addResena(
    @Param('id') id: string,
    @Body() createResenaDto: CreateResenaDto,
  ): GetResenaDto {
    return this.productosService.addResena(id, createResenaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiResponse({ status: 200, type: GetProductoDto })
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: Partial<CreateProductoDto>,
  ): GetProductoDto {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  remove(@Param('id') id: string) {
    return this.productosService.remove(id);
  }
}
