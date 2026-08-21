import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { GetProductoDto } from './dto/get-producto.dto';

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
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  findAll(): GetProductoDto[] {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, type: GetProductoDto })
  findOne(@Param('id') id: string): GetProductoDto {
    return this.productosService.findOne(id);
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
