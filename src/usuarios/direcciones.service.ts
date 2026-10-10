import { Injectable, NotFoundException } from '@nestjs/common';
import { DireccionUsuario } from './entities/direccion.entity';
import { CreateDireccionDto, GetDireccionDto } from './dto/direccion.dto';
import { DueniosService } from './duenios.service';

@Injectable()
export class DireccionesService {
  private direcciones: DireccionUsuario[] = [];

  constructor(private readonly dueniosService: DueniosService) {}

  create(usuarioId: string, dto: CreateDireccionDto): GetDireccionDto {
    this.dueniosService.findOne(usuarioId); // Valida existencia del usuario

    const usuarioDirecciones = this.direcciones.filter((d) => d.usuarioId === usuarioId);
    const esPrimera = usuarioDirecciones.length === 0;
    const esPred = dto.esPredeterminada ?? esPrimera;

    if (esPred) {
      // Desmarcar anteriores
      usuarioDirecciones.forEach((d) => (d.esPredeterminada = false));
    }

    const nuevaDireccion: DireccionUsuario = {
      id: `dir-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      usuarioId,
      direccion: dto.direccion,
      departamentoOficina: dto.departamentoOficina,
      comuna: dto.comuna,
      region: dto.region,
      referencia: dto.referencia,
      esPredeterminada: esPred,
    };

    this.direcciones.push(nuevaDireccion);
    return this.mapToDto(nuevaDireccion);
  }

  findByUsuario(usuarioId: string): GetDireccionDto[] {
    this.dueniosService.findOne(usuarioId);
    return this.direcciones
      .filter((d) => d.usuarioId === usuarioId)
      .map((d) => this.mapToDto(d));
  }

  setPredeterminada(usuarioId: string, direccionId: string): GetDireccionDto {
    this.dueniosService.findOne(usuarioId);
    const dir = this.direcciones.find(
      (d) => d.id === direccionId && d.usuarioId === usuarioId,
    );
    if (!dir) {
      throw new NotFoundException(`Dirección con ID ${direccionId} no encontrada`);
    }

    this.direcciones
      .filter((d) => d.usuarioId === usuarioId)
      .forEach((d) => (d.esPredeterminada = false));

    dir.esPredeterminada = true;
    return this.mapToDto(dir);
  }

  remove(usuarioId: string, direccionId: string): { message: string } {
    const idx = this.direcciones.findIndex(
      (d) => d.id === direccionId && d.usuarioId === usuarioId,
    );
    if (idx === -1) {
      throw new NotFoundException(`Dirección con ID ${direccionId} no encontrada`);
    }
    this.direcciones.splice(idx, 1);
    return { message: 'Dirección eliminada correctamente' };
  }

  private mapToDto(d: DireccionUsuario): GetDireccionDto {
    return { ...d };
  }
}
