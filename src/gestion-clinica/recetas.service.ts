import { Injectable, NotFoundException } from '@nestjs/common';
import { Receta } from './entities/receta.entity';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { GetRecetaDto } from './dto/get-receta.dto';
import { ConsultasService } from './consultas.service';
import { ProductosService } from '../catalogo/productos.service';

@Injectable()
export class RecetasService {
  private recetas: Receta[] = [];

  constructor(
    private readonly consultasService: ConsultasService,
    private readonly productosService: ProductosService,
  ) {}

  create(createRecetaDto: CreateRecetaDto): GetRecetaDto {
    // 1. Validar que la consulta exista
    this.consultasService.findOne(createRecetaDto.consultaId);

    // 2. Validar que todos los productos prescritos existan en el catálogo
    for (const prodId of createRecetaDto.productosPrescritosIds) {
      this.productosService.findOne(prodId);
    }

    // 3. Crear receta
    const newReceta: Receta = {
      id: `receta-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createRecetaDto,
      fechaEmision: new Date(),
    };
    this.recetas.push(newReceta);

    // 4. Asociar receta a la consulta
    this.consultasService.setReceta(createRecetaDto.consultaId, newReceta.id);

    return this.mapToGetDto(newReceta);
  }

  findAll(): GetRecetaDto[] {
    return this.recetas.map((r) => this.mapToGetDto(r));
  }

  findOne(id: string): GetRecetaDto {
    const receta = this.recetas.find((r) => r.id === id);
    if (!receta) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
    return this.mapToGetDto(receta);
  }

  update(id: string, updateRecetaDto: Partial<CreateRecetaDto>): GetRecetaDto {
    const recIndex = this.recetas.findIndex((r) => r.id === id);
    if (recIndex === -1) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }

    if (updateRecetaDto.consultaId) {
      this.consultasService.findOne(updateRecetaDto.consultaId);
    }

    if (updateRecetaDto.productosPrescritosIds) {
      for (const prodId of updateRecetaDto.productosPrescritosIds) {
        this.productosService.findOne(prodId);
      }
    }

    const updatedReceta = {
      ...this.recetas[recIndex],
      ...updateRecetaDto,
    };
    this.recetas[recIndex] = updatedReceta;
    return this.mapToGetDto(updatedReceta);
  }

  remove(id: string): { message: string } {
    const recIndex = this.recetas.findIndex((r) => r.id === id);
    if (recIndex === -1) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
    this.recetas.splice(recIndex, 1);
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
