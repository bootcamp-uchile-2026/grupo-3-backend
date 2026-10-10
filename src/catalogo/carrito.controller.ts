import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CarritoService } from './carrito.service';
import {
  AgregarAlCarritoDto,
  ActualizarCantidadItemDto,
  AplicarCuponDto,
  GetCarritoDto,
} from './dto/carrito.dto';

@ApiTags('Catálogo - Carrito de Compras')
@Controller('catalogo/carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener el estado actual y los productos del carrito' })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  @ApiQuery({ name: 'usuarioId', required: false, description: 'ID de usuario o invitado' })
  getCarrito(@Query('usuarioId') usuarioId?: string): GetCarritoDto {
    return this.carritoService.getCarrito(usuarioId);
  }

  @Post('items')
  @ApiOperation({ summary: 'Agregar un producto al carrito de compras' })
  @ApiResponse({ status: 201, type: GetCarritoDto })
  addItem(@Body() dto: AgregarAlCarritoDto): GetCarritoDto {
    return this.carritoService.addItem(dto);
  }

  @Patch('items/:productoId')
  @ApiOperation({ summary: 'Actualizar la cantidad de un producto (botones + y -)' })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  updateQuantity(
    @Param('productoId') productoId: string,
    @Body() dto: ActualizarCantidadItemDto,
  ): GetCarritoDto {
    return this.carritoService.updateQuantity(productoId, dto);
  }

  @Delete('items/:productoId')
  @ApiOperation({ summary: 'Eliminar un producto del carrito (ícono papelera 🗑)' })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  @ApiQuery({ name: 'usuarioId', required: false })
  removeItem(
    @Param('productoId') productoId: string,
    @Query('usuarioId') usuarioId?: string,
  ): GetCarritoDto {
    return this.carritoService.removeItem(productoId, usuarioId);
  }

  @Post('cupon')
  @ApiOperation({ summary: 'Aplicar un cupón de descuento promocional' })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  aplicarCupon(@Body() dto: AplicarCuponDto): GetCarritoDto {
    return this.carritoService.aplicarCupon(dto);
  }

  @Delete('cupon')
  @ApiOperation({ summary: 'Remover el cupón promocional aplicado' })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  @ApiQuery({ name: 'usuarioId', required: false })
  removerCupon(@Query('usuarioId') usuarioId?: string): GetCarritoDto {
    return this.carritoService.removerCupon(usuarioId);
  }
}
