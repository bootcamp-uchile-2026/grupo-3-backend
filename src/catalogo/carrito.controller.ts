import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  applyDecorators,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CarritoService } from './carrito.service';
import { carritoIdPipe } from 'src/common/pipes/carrito-id.pipe';
import {
  AgregarAlCarritoDto,
  ActualizarCantidadItemDto,
  AplicarCuponDto,
  GetCarritoDto,
} from './dto/carrito.dto';

//Documentacion de de las rutas que reciben :carritoId
const ApiCarritoExistente = () =>
  applyDecorators(
    ApiParam({
      name: 'carritoId',
      description: 'ID del carrito devuelto por POST /carritos',
    }),
    ApiResponse({
      status: 400,
      description: 'Id de carrito inválido o datos incorrectos.',
    }),
    ApiResponse({
      status: 400,
      description: 'El carrito no existe o ya se usó para una compra.',
    }),
  );

@ApiTags('Catálogo - Carrito de Compras')
@Controller('carritos')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un carrito de invitado',
    description:
      'Devuelve el carrito vacío con su id. El cliente debe guardar ese id para las siguientes llamadas.',
  })
  @ApiResponse({ status: 201, type: GetCarritoDto })
  crear(): GetCarritoDto {
    return this.carritoService.crear();
  }

  @Get(':carritoId')
  @ApiOperation({
    summary: 'Obtener el estado actual y los productos del carrito',
  })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  @ApiCarritoExistente()
  getCarrito(
    @Param('carritoId', carritoIdPipe) carritoId: string,
  ): GetCarritoDto {
    return this.carritoService.getCarrito(carritoId);
  }

  @Post(':carritoId/items')
  @ApiOperation({ summary: 'Agregar un producto al carrito de compras' })
  @ApiResponse({ status: 201, type: GetCarritoDto })
  @ApiResponse({ status: 409, description: 'Stock insuficiente' })
  @ApiCarritoExistente()
  addItem(
    @Param('carritoId', carritoIdPipe) carritoId: string,
    @Body() dto: AgregarAlCarritoDto,
  ): GetCarritoDto {
    return this.carritoService.addItem(carritoId, dto);
  }

  @Patch(':carritoId/items/:productoId')
  @ApiOperation({
    summary: 'Actualizar la cantidad de un producto (botones + y -)',
  })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  @ApiResponse({ status: 409, description: 'Stock insuficiente' })
  @ApiCarritoExistente()
  updateQuantity(
    @Param('carritoId', carritoIdPipe) carritoId: string,
    @Param('productoId') productoId: string,
    @Body() dto: ActualizarCantidadItemDto,
  ): GetCarritoDto {
    return this.carritoService.updateQuantity(carritoId, productoId, dto);
  }

  @Delete(':carritoId/items/:productoId')
  @ApiOperation({
    summary: 'Eliminar un producto del carrito (ícono papelera 🗑)',
  })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  @ApiCarritoExistente()
  removeItem(
    @Param('carritoId', carritoIdPipe) carritoId: string,
    @Param('productoId') productoId: string,
  ): GetCarritoDto {
    return this.carritoService.removeItem(carritoId, productoId);
  }

  @Put(':carritoId/cupon')
  @ApiOperation({
    summary: 'Aplicar un cupón de descuento (reemplaza el que hubiera)',
  })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  @ApiCarritoExistente()
  aplicarCupon(
    @Param('carritoId', carritoIdPipe) carritoId: string,
    @Body() dto: AplicarCuponDto,
  ): GetCarritoDto {
    return this.carritoService.aplicarCupon(carritoId, dto);
  }

  @Delete(':carritoId/cupon')
  @ApiOperation({ summary: 'Remover el cupón promocional aplicado' })
  @ApiResponse({ status: 200, type: GetCarritoDto })
  @ApiCarritoExistente()
  removerCupon(
    @Param('carritoId', carritoIdPipe) carritoId: string,
  ): GetCarritoDto {
    return this.carritoService.removerCupon(carritoId);
  }
}
