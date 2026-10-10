import { Injectable, NotFoundException } from '@nestjs/common';
import { ConsultaClinica } from './entities/consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { GetConsultaDto } from './dto/get-consulta.dto';
import { MascotasService } from '../usuarios/mascotas.service';
import { VeterinariosService } from '../usuarios/veterinarios.service';

@Injectable()
export class ConsultasService {
  private consultas: ConsultaClinica[] = [];

  constructor(
    private readonly mascotasService: MascotasService,
    private readonly veterinariosService: VeterinariosService,
  ) {}

  create(createConsultaDto: CreateConsultaDto): GetConsultaDto {
    // Validar mascota y veterinario
    this.mascotasService.findOne(createConsultaDto.mascotaId);
    this.veterinariosService.findOne(createConsultaDto.veterinarioId);

    const newConsulta: ConsultaClinica = {
      idAtencion: `atencion-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createConsultaDto,
      fechaConsulta: new Date(createConsultaDto.fechaConsulta),
      fechaProxConsulta: createConsultaDto.fechaProxConsulta
        ? new Date(createConsultaDto.fechaProxConsulta)
        : undefined,
      fechaProxVacuna: createConsultaDto.fechaProxVacuna
        ? new Date(createConsultaDto.fechaProxVacuna)
        : undefined,
      fechaProxExamenes: createConsultaDto.fechaProxExamenes
        ? new Date(createConsultaDto.fechaProxExamenes)
        : undefined,
    };
    this.consultas.push(newConsulta);
    return this.mapToGetDto(newConsulta);
  }

  findAll(): GetConsultaDto[] {
    return this.consultas.map((c) => this.mapToGetDto(c));
  }

  findOne(id: string): GetConsultaDto {
    const consulta = this.consultas.find((c) => c.idAtencion === id);
    if (!consulta) {
      throw new NotFoundException(`Consulta con ID ${id} no encontrada`);
    }
    return this.mapToGetDto(consulta);
  }

  findOneEntity(id: string): ConsultaClinica {
    const consulta = this.consultas.find((c) => c.idAtencion === id);
    if (!consulta) {
      throw new NotFoundException(`Consulta con ID ${id} no encontrada`);
    }
    return consulta;
  }

  update(
    id: string,
    updateConsultaDto: Partial<CreateConsultaDto>,
  ): GetConsultaDto {
    const consIndex = this.consultas.findIndex((c) => c.idAtencion === id);
    if (consIndex === -1) {
      throw new NotFoundException(`Consulta con ID ${id} no encontrada`);
    }

    if (updateConsultaDto.mascotaId) {
      this.mascotasService.findOne(updateConsultaDto.mascotaId);
    }
    if (updateConsultaDto.veterinarioId) {
      this.veterinariosService.findOne(updateConsultaDto.veterinarioId);
    }

    const updatedConsulta = {
      ...this.consultas[consIndex],
      ...updateConsultaDto,
      fechaConsulta: updateConsultaDto.fechaConsulta
        ? new Date(updateConsultaDto.fechaConsulta)
        : this.consultas[consIndex].fechaConsulta,
      fechaProxConsulta: updateConsultaDto.fechaProxConsulta
        ? new Date(updateConsultaDto.fechaProxConsulta)
        : this.consultas[consIndex].fechaProxConsulta,
      fechaProxVacuna: updateConsultaDto.fechaProxVacuna
        ? new Date(updateConsultaDto.fechaProxVacuna)
        : this.consultas[consIndex].fechaProxVacuna,
      fechaProxExamenes: updateConsultaDto.fechaProxExamenes
        ? new Date(updateConsultaDto.fechaProxExamenes)
        : this.consultas[consIndex].fechaProxExamenes,
    };
    this.consultas[consIndex] = updatedConsulta;
    return this.mapToGetDto(updatedConsulta);
  }

  setReceta(consultaId: string, recetaId: string): void {
    const consulta = this.findOneEntity(consultaId);
    consulta.recetaId = recetaId;
  }

  remove(id: string): { message: string } {
    const consIndex = this.consultas.findIndex((c) => c.idAtencion === id);
    if (consIndex === -1) {
      throw new NotFoundException(`Consulta con ID ${id} no encontrada`);
    }
    this.consultas.splice(consIndex, 1);
    return { message: `Consulta con ID ${id} eliminada correctamente` };
  }

  private mapToGetDto(consulta: ConsultaClinica): GetConsultaDto {
    return {
      idAtencion: consulta.idAtencion,
      diagnostico: consulta.diagnostico,
      fechaConsulta: consulta.fechaConsulta,
      fechaProxConsulta: consulta.fechaProxConsulta,
      fechaProxVacuna: consulta.fechaProxVacuna,
      fechaProxExamenes: consulta.fechaProxExamenes,
      mascotaId: consulta.mascotaId,
      veterinarioId: consulta.veterinarioId,
      recetaId: consulta.recetaId,
    };
  }
}
