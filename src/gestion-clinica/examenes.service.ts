import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenExamen } from './entities/orden-examen.entity';
import { Examen } from './entities/examen.entity';
import { CreateOrdenExamenDto } from './dto/create-orden-examen.dto';
import { CreateExamenDto } from './dto/create-examen.dto';
import { GetOrdenExamenDto } from './dto/get-orden-examen.dto';
import { GetExamenDto } from './dto/get-examen.dto';
import { ConsultasService } from './consultas.service';
import { UpdateExamenDto } from './dto/update-examen.dto';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class ExamenesService {
  constructor(
    @InjectRepository(OrdenExamen)
    private readonly ordenesRepo: Repository<OrdenExamen>,
    @InjectRepository(Examen)
    private readonly examenesRepo: Repository<Examen>,
    private readonly consultasService: ConsultasService,
  ) {}

  // --- Órdenes de Examen ---
  async createOrden(
    createOrdenDto: CreateOrdenExamenDto,
  ): Promise<GetOrdenExamenDto> {
    await this.consultasService.findOne(createOrdenDto.consultaId);

    const newOrden = this.ordenesRepo.create({
      id: `orden-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createOrdenDto,
      fechaEmision: new Date(),
    });
    const saved = await this.ordenesRepo.save(newOrden);
    return this.mapToGetOrdenDto(saved);
  }

  async findAllOrdenes(): Promise<GetOrdenExamenDto[]> {
    const list = await this.ordenesRepo.find();
    return list.map((o) => this.mapToGetOrdenDto(o));
  }

  async findOneOrden(id: string): Promise<GetOrdenExamenDto> {
    const orden = await this.ordenesRepo.findOne({ where: { id } });
    if (!orden) {
      throw new RecursoNoEncontradoError(
        `Orden de examen con ID ${id} no encontrada`,
      );
    }
    return this.mapToGetOrdenDto(orden);
  }

  async findOneOrdenEntity(id: string): Promise<OrdenExamen> {
    const orden = await this.ordenesRepo.findOne({ where: { id } });
    if (!orden) {
      throw new RecursoNoEncontradoError(
        `Orden de examen con ID ${id} no encontrada`,
      );
    }
    return orden;
  }

  async findOrdenesByConsulta(
    consultaId: string,
  ): Promise<GetOrdenExamenDto[]> {
    await this.consultasService.findOne(consultaId);
    const list = await this.ordenesRepo.find({ where: { consultaId } });
    return list.map((o) => this.mapToGetOrdenDto(o));
  }

  // --- Detalles de Examen ---
  async createExamen(createExamenDto: CreateExamenDto): Promise<GetExamenDto> {
    await this.findOneOrden(createExamenDto.ordenId);

    const newExamen = this.examenesRepo.create({
      id: `examen-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      resultado: createExamenDto.resultado || 'Pendiente',
      ...createExamenDto,
    });
    const saved = await this.examenesRepo.save(newExamen);
    return this.mapToGetExamenDto(saved);
  }

  async findAllExamenes(): Promise<GetExamenDto[]> {
    const list = await this.examenesRepo.find();
    return list.map((e) => this.mapToGetExamenDto(e));
  }

  async findOneExamen(id: string): Promise<GetExamenDto> {
    const examen = await this.examenesRepo.findOne({ where: { id } });
    if (!examen) {
      throw new RecursoNoEncontradoError(`Examen con ID ${id} no encontrado`);
    }
    return this.mapToGetExamenDto(examen);
  }

  async findExamenesByOrden(ordenId: string): Promise<GetExamenDto[]> {
    await this.findOneOrden(ordenId);
    const list = await this.examenesRepo.find({ where: { ordenId } });
    return list.map((e) => this.mapToGetExamenDto(e));
  }

  async updateExamen(
    id: string,
    updateExamenDto: UpdateExamenDto,
  ): Promise<GetExamenDto> {
    const existing = await this.examenesRepo.findOne({ where: { id } });
    if (!existing) {
      throw new RecursoNoEncontradoError(`Examen con ID ${id} no encontrado`);
    }

    if (updateExamenDto.ordenId) {
      await this.findOneOrden(updateExamenDto.ordenId);
    }

    const updatedExamen = this.examenesRepo.merge(existing, updateExamenDto);
    const saved = await this.examenesRepo.save(updatedExamen);
    return this.mapToGetExamenDto(saved);
  }

  private mapToGetOrdenDto(orden: OrdenExamen): GetOrdenExamenDto {
    return {
      id: orden.id,
      fechaEmision: orden.fechaEmision,
      consultaId: orden.consultaId,
    };
  }

  private mapToGetExamenDto(examen: Examen): GetExamenDto {
    return {
      id: examen.id,
      nombreExamen: examen.nombreExamen,
      resultado: examen.resultado,
      estado: examen.estado,
      ordenId: examen.ordenId,
    };
  }
}
