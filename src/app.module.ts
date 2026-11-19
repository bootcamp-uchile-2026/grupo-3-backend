import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { GestionClinicaModule } from './gestion-clinica/gestion-clinica.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './database/data-source';

// 1. Importamos nuestros middlewares
import { RequestIdMiddleware } from './common/middlewares/request-id.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsuariosModule,
    CatalogoModule,
    GestionClinicaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Aplicamos ambos middlewares en orden
      .apply(RequestIdMiddleware, LoggerMiddleware)
      // Excluimos la ruta pública de ofertas para practicar .exclude()
      .exclude({
        path: 'catalogo/productos/ofertas',
        method: RequestMethod.GET,
      })
      // Lo activamos para Productos y Dueños
      .forRoutes('*');
  }
}
