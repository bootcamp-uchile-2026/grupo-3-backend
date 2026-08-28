import { Module } from '@nestjs/common';
import { DueniosController } from './duenios.controller';
import { VeterinariosController } from './veterinarios.controller';
import { MascotasController } from './mascotas.controller';
import { CitasController } from './citas.controller';
import { DueniosService } from './duenios.service';
import { VeterinariosService } from './veterinarios.service';
import { MascotasService } from './mascotas.service';
import { CitasService } from './citas.service';

@Module({
  controllers: [
    DueniosController,
    VeterinariosController,
    MascotasController,
    CitasController,
  ],
  providers: [
    DueniosService,
    VeterinariosService,
    MascotasService,
    CitasService,
  ],
  exports: [DueniosService, VeterinariosService, MascotasService, CitasService],
})
export class UsuariosModule {}
