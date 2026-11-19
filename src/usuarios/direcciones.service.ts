import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DireccionUsuario } from './entities/direccion.entity';
import { CreateDireccionDto, GetDireccionDto } from './dto/direccion.dto';
import { DueniosService } from './duenios.service';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(DireccionUsuario)
    private readonly direccionesRepo: Repository<DireccionUsuario>,
    private readonly dueniosService: DueniosService,
  ) {}

  async create(
    usuarioId: string,
    dto: CreateDireccionDto,
  ): Promise<GetDireccionDto> {
    await this.dueniosService.findOne(usuarioId);

    const usuarioDirecciones = await this.direccionesRepo.find({
      where: { usuarioId },
    });
    const esPrimera = usuarioDirecciones.length === 0;
    const esPred = dto.esPredeterminada ?? esPrimera;

    if (esPred && usuarioDirecciones.length > 0) {
      await this.direccionesRepo.update(
        { usuarioId },
        { esPredeterminada: false },
      );
    }

    const nuevaDireccion = this.direccionesRepo.create({
      id: `dir-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      usuarioId,
      direccion: dto.direccion,
      departamentoOficina: dto.departamentoOficina,
      comuna: dto.comuna,
      region: dto.region,
      referencia: dto.referencia,
      esPredeterminada: esPred,
    });

    const saved = await this.direccionesRepo.save(nuevaDireccion);
    return this.mapToDto(saved);
  }

  async findByUsuario(usuarioId: string): Promise<GetDireccionDto[]> {
    await this.dueniosService.findOne(usuarioId);
    const list = await this.direccionesRepo.find({ where: { usuarioId } });
    return list.map((d) => this.mapToDto(d));
  }

  async setPredeterminada(
    usuarioId: string,
    direccionId: string,
  ): Promise<GetDireccionDto> {
    await this.dueniosService.findOne(usuarioId);
    const dir = await this.direccionesRepo.findOne({
      where: { id: direccionId, usuarioId },
    });
    if (!dir) {
      throw new RecursoNoEncontradoError(
        `Dirección con ID ${direccionId} no encontrada`,
      );
    }

    await this.direccionesRepo.update(
      { usuarioId },
      { esPredeterminada: false },
    );

    dir.esPredeterminada = true;
    const saved = await this.direccionesRepo.save(dir);
    return this.mapToDto(saved);
  }

  async remove(
    usuarioId: string,
    direccionId: string,
  ): Promise<{ message: string }> {
    const dir = await this.direccionesRepo.findOne({
      where: { id: direccionId, usuarioId },
    });
    if (!dir) {
      throw new RecursoNoEncontradoError(
        `Dirección con ID ${direccionId} no encontrada`,
      );
    }
    await this.direccionesRepo.remove(dir);
    return { message: 'Dirección eliminada correctamente' };
  }

  private mapToDto(d: DireccionUsuario): GetDireccionDto {
    return {
      id: d.id,
      usuarioId: d.usuarioId,
      direccion: d.direccion,
      departamentoOficina: d.departamentoOficina,
      comuna: d.comuna,
      region: d.region,
      referencia: d.referencia,
      esPredeterminada: d.esPredeterminada,
    };
  }
}
