import { Module } from '@nestjs/common';
import { ConsultasController } from './consultas.controller';
import { RecetasController } from './recetas.controller';
import { ExamenesController } from './examenes.controller';
import { ConsultasService } from './consultas.service';
import { RecetasService } from './recetas.service';
import { ExamenesService } from './examenes.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CatalogoModule } from '../catalogo/catalogo.module';

@Module({
  imports: [UsuariosModule, CatalogoModule],
  controllers: [ConsultasController, RecetasController, ExamenesController],
  providers: [ConsultasService, RecetasService, ExamenesService],
  exports: [ConsultasService, RecetasService, ExamenesService],
})
export class GestionClinicaModule {}
