import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ServiciosController } from './servicios.controller';
import { CatalogoController } from './catalogo.controller';
import { CarritoController } from './carrito.controller';
import { PedidosController } from './pedidos.controller';
import { ProductosService } from './productos.service';
import { ServiciosService } from './servicios.service';
import { CatalogoService } from './catalogo.service';
import { CarritoService } from './carrito.service';
import { PedidosService } from './pedidos.service';

@Module({
  controllers: [
    ProductosController,
    ServiciosController,
    CatalogoController,
    CarritoController,
    PedidosController,
  ],
  providers: [
    ProductosService,
    ServiciosService,
    CatalogoService,
    CarritoService,
    PedidosService,
  ],
  exports: [
    ProductosService,
    ServiciosService,
    CatalogoService,
    CarritoService,
    PedidosService,
  ],
})
export class CatalogoModule {}
