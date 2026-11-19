import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultasController } from './consultas.controller';
import { RecetasController } from './recetas.controller';
import { ExamenesController } from './examenes.controller';
import { ConsultasService } from './consultas.service';
import { RecetasService } from './recetas.service';
import { ExamenesService } from './examenes.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CatalogoModule } from '../catalogo/catalogo.module';
import { ConsultaClinica } from './entities/consulta.entity';
import { Receta } from './entities/receta.entity';
import { OrdenExamen } from './entities/orden-examen.entity';
import { Examen } from './entities/examen.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsultaClinica,
      Receta,
      OrdenExamen,
      Examen,
    ]),
    UsuariosModule,
    CatalogoModule,
  ],
  controllers: [ConsultasController, RecetasController, ExamenesController],
  providers: [ConsultasService, RecetasService, ExamenesService],
  exports: [ConsultasService, RecetasService, ExamenesService, TypeOrmModule],
})
export class GestionClinicaModule {}
