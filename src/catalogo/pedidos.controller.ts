import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PedidosService } from './pedidos.service';
import {
  CreatePedidoDto,
  GetPedidoDto,
  SeguimientoPedidoDto,
} from './dto/pedido.dto';
import { carritoIdPipe } from 'src/common/pipes/carrito-id.pipe';

@ApiTags('Catálogo - Pedidos y Checkout')
@Controller()
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post('carritos/:carritoId/pedido')
  @ApiOperation({
    summary: 'Finalizar la compra del carrito y crear el pedido',
    description:
      'Tras una compra exitosa, el carrito se cierra y su id deja de ser válido.',
  })
  @ApiParam({
    name: 'carritoId',
    description: 'ID del carrito devuelto por POST /carritos',
  })
  @ApiResponse({ status: 201, type: GetPedidoDto })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos, id de carrito inválido o carrito vacío',
  })
  @ApiResponse({
    status: 404,
    description: 'El carrito no existe o ya se usó para una compra',
  })
  @ApiResponse({
    status: 409,
    description: 'Stock insuficiente de algún producto',
  })
  create(
    @Param('carritoId', carritoIdPipe) carritoId: string,
    @Body() dto: CreatePedidoDto,
  ): Promise<GetPedidoDto> {
    return this.pedidosService.create(carritoId, dto);
  }

  @Get('catalogo/pedidos/:id')
  @ApiOperation({
    summary:
      'Obtener el detalle de confirmación de un pedido por número de orden',
  })
  @ApiResponse({ status: 200, type: GetPedidoDto })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  findOne(@Param('id') id: string): Promise<GetPedidoDto> {
    return this.pedidosService.findOne(id);
  }

  @Get('catalogo/pedidos/:id/seguimiento')
  @ApiOperation({
    summary: 'Obtener el tracking y estado de entrega de un pedido',
  })
  @ApiResponse({ status: 200, type: SeguimientoPedidoDto })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  getSeguimiento(@Param('id') id: string): Promise<SeguimientoPedidoDto> {
    return this.pedidosService.getSeguimiento(id);
  }
}
