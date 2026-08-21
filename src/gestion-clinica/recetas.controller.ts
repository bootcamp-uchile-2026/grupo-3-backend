import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { GetRecetaDto } from './dto/get-receta.dto';

@ApiTags('Gestión de Clínica - Recetas')
@Controller('gestion-clinica/recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  @ApiOperation({
    summary: 'Emitir una nueva receta (prescripción) para una consulta clínica',
  })
  @ApiResponse({ status: 201, type: GetRecetaDto })
  create(@Body() createRecetaDto: CreateRecetaDto): GetRecetaDto {
    return this.recetasService.create(createRecetaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las recetas emitidas' })
  @ApiResponse({ status: 200, type: [GetRecetaDto] })
  findAll(): GetRecetaDto[] {
    return this.recetasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el detalle de una receta por ID' })
  @ApiResponse({ status: 200, type: GetRecetaDto })
  findOne(@Param('id') id: string): GetRecetaDto {
    return this.recetasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una receta por ID' })
  @ApiResponse({ status: 200, type: GetRecetaDto })
  update(
    @Param('id') id: string,
    @Body() updateRecetaDto: Partial<CreateRecetaDto>,
  ): GetRecetaDto {
    return this.recetasService.update(id, updateRecetaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una receta por ID' })
  remove(@Param('id') id: string) {
    return this.recetasService.remove(id);
  }
}
