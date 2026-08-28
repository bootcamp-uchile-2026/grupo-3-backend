import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ServiciosController } from './servicios.controller';
import { CatalogoController } from './catalogo.controller';
import { ProductosService } from './productos.service';
import { ServiciosService } from './servicios.service';
import { CatalogoService } from './catalogo.service';

@Module({
  controllers: [ProductosController, ServiciosController, CatalogoController],
  providers: [ProductosService, ServiciosService, CatalogoService],
  exports: [ProductosService, ServiciosService, CatalogoService],
})
export class CatalogoModule {}
