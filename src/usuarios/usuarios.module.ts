import { Module } from '@nestjs/common';
import { DueniosController } from './duenios.controller';
import { VeterinariosController } from './veterinarios.controller';
import { MascotasController } from './mascotas.controller';
import { CitasController } from './citas.controller';
import { DireccionesController } from './direcciones.controller';
import { DueniosService } from './duenios.service';
import { VeterinariosService } from './veterinarios.service';
import { MascotasService } from './mascotas.service';
import { CitasService } from './citas.service';
import { DireccionesService } from './direcciones.service';

@Module({
  controllers: [
    DueniosController,
    VeterinariosController,
    MascotasController,
    CitasController,
    DireccionesController,
  ],
  providers: [
    DueniosService,
    VeterinariosService,
    MascotasService,
    CitasService,
    DireccionesService,
  ],
  exports: [
    DueniosService,
    VeterinariosService,
    MascotasService,
    CitasService,
    DireccionesService,
  ],
})
export class UsuariosModule {}
