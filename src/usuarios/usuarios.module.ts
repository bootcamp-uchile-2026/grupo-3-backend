import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { DuenioMascota } from './entities/duenio.entity';
import { Veterinario } from './entities/veterinario.entity';
import { FichaMascota } from './entities/mascota.entity';
import { AgendaCitas } from './entities/cita.entity';
import { DireccionUsuario } from './entities/direccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DuenioMascota,
      Veterinario,
      FichaMascota,
      AgendaCitas,
      DireccionUsuario,
    ]),
  ],
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
    TypeOrmModule,
  ],
})
export class UsuariosModule {}
