import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { GestionClinicaModule } from './gestion-clinica/gestion-clinica.module';

@Module({
  imports: [UsuariosModule, CatalogoModule, GestionClinicaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}