import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PedidosService } from './pedidos.service';
import {
  CreatePedidoDto,
  GetPedidoDto,
  SeguimientoPedidoDto,
} from './dto/pedido.dto';

@ApiTags('Catálogo - Pedidos y Checkout')
@Controller('catalogo/pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @ApiOperation({ summary: 'Finalizar compra y crear una nueva orden de pedido' })
  @ApiResponse({ status: 201, type: GetPedidoDto })
  create(@Body() dto: CreatePedidoDto): GetPedidoDto {
    return this.pedidosService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el detalle de confirmación de un pedido por ID' })
  @ApiResponse({ status: 200, type: GetPedidoDto })
  findOne(@Param('id') id: string): GetPedidoDto {
    return this.pedidosService.findOne(id);
  }

  @Get(':id/seguimiento')
  @ApiOperation({ summary: 'Obtener el tracking y estado de entrega de un pedido' })
  @ApiResponse({ status: 200, type: SeguimientoPedidoDto })
  getSeguimiento(@Param('id') id: string): SeguimientoPedidoDto {
    return this.pedidosService.getSeguimiento(id);
  }

  @Get('usuario/:usuarioId')
  @ApiOperation({ summary: 'Obtener el historial de pedidos de un usuario' })
  @ApiResponse({ status: 200, type: [GetPedidoDto] })
  findByUsuario(@Param('usuarioId') usuarioId: string): GetPedidoDto[] {
    return this.pedidosService.findByUsuario(usuarioId);
  }
}
