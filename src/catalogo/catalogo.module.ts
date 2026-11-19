import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { Producto } from './entities/producto.entity';
import { Servicio } from './entities/servicio.entity';
import { Resena } from './entities/resena.entity';
import { Carrito, ItemCarrito } from './entities/carrito.entity';
import { Pedido, ItemPedido } from './entities/pedido.entity';
import { ProductoExistePipe } from '../common/pipes/producto-existe.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      Servicio,
      Resena,
      Carrito,
      ItemCarrito,
      Pedido,
      ItemPedido,
    ]),
  ],
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
    ProductoExistePipe,
  ],
  exports: [
    ProductosService,
    ServiciosService,
    CatalogoService,
    CarritoService,
    PedidosService,
    ProductoExistePipe,
    TypeOrmModule,
  ],
})
export class CatalogoModule {}
