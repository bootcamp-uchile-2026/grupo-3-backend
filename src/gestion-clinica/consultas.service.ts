import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultaClinica } from './entities/consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { GetConsultaDto } from './dto/get-consulta.dto';
import { MascotasService } from '../usuarios/mascotas.service';
import { VeterinariosService } from '../usuarios/veterinarios.service';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(ConsultaClinica)
    private readonly consultasRepo: Repository<ConsultaClinica>,
    private readonly mascotasService: MascotasService,
    private readonly veterinariosService: VeterinariosService,
  ) {}

  async create(createConsultaDto: CreateConsultaDto): Promise<GetConsultaDto> {
    await this.mascotasService.findOne(createConsultaDto.mascotaId);
    await this.veterinariosService.findOne(createConsultaDto.veterinarioId);

    const newConsulta = this.consultasRepo.create({
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
    });
    const saved = await this.consultasRepo.save(newConsulta);
    return this.mapToGetDto(saved);
  }

  async findAll(): Promise<GetConsultaDto[]> {
    const list = await this.consultasRepo.find();
    return list.map((c) => this.mapToGetDto(c));
  }

  async findOne(id: string): Promise<GetConsultaDto> {
    const consulta = await this.consultasRepo.findOne({
      where: { idAtencion: id },
    });
    if (!consulta) {
      throw new RecursoNoEncontradoError(`Consulta con ID ${id} no encontrada`);
    }
    return this.mapToGetDto(consulta);
  }

  async findOneEntity(id: string): Promise<ConsultaClinica> {
    const consulta = await this.consultasRepo.findOne({
      where: { idAtencion: id },
    });
    if (!consulta) {
      throw new RecursoNoEncontradoError(`Consulta con ID ${id} no encontrada`);
    }
    return consulta;
  }

  async update(
    id: string,
    updateConsultaDto: UpdateConsultaDto,
  ): Promise<GetConsultaDto> {
    const existing = await this.findOneEntity(id);

    if (updateConsultaDto.mascotaId) {
      await this.mascotasService.findOne(updateConsultaDto.mascotaId);
    }
    if (updateConsultaDto.veterinarioId) {
      await this.veterinariosService.findOne(updateConsultaDto.veterinarioId);
    }

    const updatedConsulta = this.consultasRepo.merge(existing, {
      ...updateConsultaDto,
      fechaConsulta: updateConsultaDto.fechaConsulta
        ? new Date(updateConsultaDto.fechaConsulta)
        : existing.fechaConsulta,
      fechaProxConsulta: updateConsultaDto.fechaProxConsulta
        ? new Date(updateConsultaDto.fechaProxConsulta)
        : existing.fechaProxConsulta,
      fechaProxVacuna: updateConsultaDto.fechaProxVacuna
        ? new Date(updateConsultaDto.fechaProxVacuna)
        : existing.fechaProxVacuna,
      fechaProxExamenes: updateConsultaDto.fechaProxExamenes
        ? new Date(updateConsultaDto.fechaProxExamenes)
        : existing.fechaProxExamenes,
    });
    const saved = await this.consultasRepo.save(updatedConsulta);
    return this.mapToGetDto(saved);
  }

  async setReceta(consultaId: string, recetaId: string): Promise<void> {
    const consulta = await this.findOneEntity(consultaId);
    consulta.recetaId = recetaId;
    await this.consultasRepo.save(consulta);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existing = await this.findOneEntity(id);
    await this.consultasRepo.remove(existing);
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
