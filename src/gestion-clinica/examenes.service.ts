import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdenExamen } from './entities/orden-examen.entity';
import { Examen } from './entities/examen.entity';
import { CreateOrdenExamenDto } from './dto/create-orden-examen.dto';
import { CreateExamenDto } from './dto/create-examen.dto';
import { GetOrdenExamenDto } from './dto/get-orden-examen.dto';
import { GetExamenDto } from './dto/get-examen.dto';
import { ConsultasService } from './consultas.service';

@Injectable()
export class ExamenesService {
  private ordenes: OrdenExamen[] = [];
  private examenes: Examen[] = [];

  constructor(private readonly consultasService: ConsultasService) {}

  // --- Órdenes de Examen ---
  createOrden(createOrdenDto: CreateOrdenExamenDto): GetOrdenExamenDto {
    // Validar consulta
    this.consultasService.findOne(createOrdenDto.consultaId);

    const newOrden: OrdenExamen = {
      id: `orden-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createOrdenDto,
      fechaEmision: new Date(),
    };
    this.ordenes.push(newOrden);
    return this.mapToGetOrdenDto(newOrden);
  }

  findAllOrdenes(): GetOrdenExamenDto[] {
    return this.ordenes.map((o) => this.mapToGetOrdenDto(o));
  }

  findOneOrden(id: string): GetOrdenExamenDto {
    const orden = this.ordenes.find((o) => o.id === id);
    if (!orden) {
      throw new NotFoundException(`Orden de examen con ID ${id} no encontrada`);
    }
    return this.mapToGetOrdenDto(orden);
  }

  findOneOrdenEntity(id: string): OrdenExamen {
    const orden = this.ordenes.find((o) => o.id === id);
    if (!orden) {
      throw new NotFoundException(`Orden de examen con ID ${id} no encontrada`);
    }
    return orden;
  }

  findOrdenesByConsulta(consultaId: string): GetOrdenExamenDto[] {
    this.consultasService.findOne(consultaId);
    return this.ordenes
      .filter((o) => o.consultaId === consultaId)
      .map((o) => this.mapToGetOrdenDto(o));
  }

  // --- Detalles de Examen ---
  createExamen(createExamenDto: CreateExamenDto): GetExamenDto {
    // Validar que la orden exista
    this.findOneOrden(createExamenDto.ordenId);

    const newExamen: Examen = {
      id: `examen-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      resultado: createExamenDto.resultado || 'Pendiente',
      ...createExamenDto,
    };
    this.examenes.push(newExamen);
    return this.mapToGetExamenDto(newExamen);
  }

  findAllExamenes(): GetExamenDto[] {
    return this.examenes.map((e) => this.mapToGetExamenDto(e));
  }

  findOneExamen(id: string): GetExamenDto {
    const examen = this.examenes.find((e) => e.id === id);
    if (!examen) {
      throw new NotFoundException(`Examen con ID ${id} no encontrado`);
    }
    return this.mapToGetExamenDto(examen);
  }

  findExamenesByOrden(ordenId: string): GetExamenDto[] {
    this.findOneOrden(ordenId);
    return this.examenes
      .filter((e) => e.ordenId === ordenId)
      .map((e) => this.mapToGetExamenDto(e));
  }

  updateExamen(
    id: string,
    updateExamenDto: Partial<CreateExamenDto>,
  ): GetExamenDto {
    const exIndex = this.examenes.findIndex((e) => e.id === id);
    if (exIndex === -1) {
      throw new NotFoundException(`Examen con ID ${id} no encontrado`);
    }

    if (updateExamenDto.ordenId) {
      this.findOneOrden(updateExamenDto.ordenId);
    }

    const updatedExamen = {
      ...this.examenes[exIndex],
      ...updateExamenDto,
    };
    this.examenes[exIndex] = updatedExamen;
    return this.mapToGetExamenDto(updatedExamen);
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
