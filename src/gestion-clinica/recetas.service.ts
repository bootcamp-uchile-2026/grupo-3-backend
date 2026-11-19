import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { GetRecetaDto } from './dto/get-receta.dto';
import { ConsultasService } from './consultas.service';
import { ProductosService } from '../catalogo/productos.service';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetasRepo: Repository<Receta>,
    private readonly consultasService: ConsultasService,
    private readonly productosService: ProductosService,
  ) {}

  async create(createRecetaDto: CreateRecetaDto): Promise<GetRecetaDto> {
    // 1. Validar que la consulta exista
    await this.consultasService.findOne(createRecetaDto.consultaId);

    // 2. Validar que todos los productos prescritos existan en el catálogo
    for (const prodId of createRecetaDto.productosPrescritosIds) {
      await this.productosService.findOne(prodId);
    }

    // 3. Crear receta
    const newReceta = this.recetasRepo.create({
      id: `receta-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createRecetaDto,
      fechaEmision: new Date(),
    });
    const saved = await this.recetasRepo.save(newReceta);

    // 4. Asociar receta a la consulta
    await this.consultasService.setReceta(createRecetaDto.consultaId, saved.id);

    return this.mapToGetDto(saved);
  }

  async findAll(): Promise<GetRecetaDto[]> {
    const list = await this.recetasRepo.find();
    return list.map((r) => this.mapToGetDto(r));
  }

  async findOne(id: string): Promise<GetRecetaDto> {
    const receta = await this.recetasRepo.findOne({ where: { id } });
    if (!receta) {
      throw new RecursoNoEncontradoError(`Receta con ID ${id} no encontrada`);
    }
    return this.mapToGetDto(receta);
  }

  async update(
    id: string,
    updateRecetaDto: UpdateRecetaDto,
  ): Promise<GetRecetaDto> {
    const existing = await this.recetasRepo.findOne({ where: { id } });
    if (!existing) {
      throw new RecursoNoEncontradoError(`Receta con ID ${id} no encontrada`);
    }

    if (updateRecetaDto.consultaId) {
      await this.consultasService.findOne(updateRecetaDto.consultaId);
    }

    if (updateRecetaDto.productosPrescritosIds) {
      for (const prodId of updateRecetaDto.productosPrescritosIds) {
        await this.productosService.findOne(prodId);
      }
    }

    const updatedReceta = this.recetasRepo.merge(existing, updateRecetaDto);
    const saved = await this.recetasRepo.save(updatedReceta);
    return this.mapToGetDto(saved);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existing = await this.recetasRepo.findOne({ where: { id } });
    if (!existing) {
      throw new RecursoNoEncontradoError(`Receta con ID ${id} no encontrada`);
    }
    await this.recetasRepo.remove(existing);
    return { message: `Receta con ID ${id} eliminada correctamente` };
  }

  private mapToGetDto(receta: Receta): GetRecetaDto {
    return {
      id: receta.id,
      dosis: receta.dosis,
      frecuencia: receta.frecuencia,
      duracion: receta.duracion,
      fechaEmision: receta.fechaEmision,
      consultaId: receta.consultaId,
      productosPrescritosIds: receta.productosPrescritosIds,
    };
  }
}
