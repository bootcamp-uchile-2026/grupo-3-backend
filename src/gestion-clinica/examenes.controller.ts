import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExamenesService } from './examenes.service';
import { CreateOrdenExamenDto } from './dto/create-orden-examen.dto';
import { CreateExamenDto } from './dto/create-examen.dto';
import { GetOrdenExamenDto } from './dto/get-orden-examen.dto';
import { GetExamenDto } from './dto/get-examen.dto';

@ApiTags('Gestión de Clínica - Órdenes y Exámenes')
@Controller('gestion-clinica/examenes')
export class ExamenesController {
  constructor(private readonly examenesService: ExamenesService) {}

  @Post('ordenes')
  @ApiOperation({
    summary: 'Emitir una nueva orden de examen asociada a una consulta',
  })
  @ApiResponse({ status: 201, type: GetOrdenExamenDto })
  createOrden(@Body() createOrdenDto: CreateOrdenExamenDto): GetOrdenExamenDto {
    return this.examenesService.createOrden(createOrdenDto);
  }

  @Get('ordenes')
  @ApiOperation({ summary: 'Obtener todas las órdenes de exámenes' })
  @ApiResponse({ status: 200, type: [GetOrdenExamenDto] })
  findAllOrdenes(): GetOrdenExamenDto[] {
    return this.examenesService.findAllOrdenes();
  }

  @Get('ordenes/:id')
  @ApiOperation({ summary: 'Obtener una orden de examen por ID' })
  @ApiResponse({ status: 200, type: GetOrdenExamenDto })
  findOneOrden(@Param('id') id: string): GetOrdenExamenDto {
    return this.examenesService.findOneOrden(id);
  }

  @Get('ordenes/consulta/:consultaId')
  @ApiOperation({
    summary: 'Obtener órdenes de examen de una consulta específica',
  })
  @ApiResponse({ status: 200, type: [GetOrdenExamenDto] })
  findOrdenesByConsulta(
    @Param('consultaId') consultaId: string,
  ): GetOrdenExamenDto[] {
    return this.examenesService.findOrdenesByConsulta(consultaId);
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar un examen específico dentro de una orden',
  })
  @ApiResponse({ status: 201, type: GetExamenDto })
  createExamen(@Body() createExamenDto: CreateExamenDto): GetExamenDto {
    return this.examenesService.createExamen(createExamenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los exámenes registrados' })
  @ApiResponse({ status: 200, type: [GetExamenDto] })
  findAllExamenes(): GetExamenDto[] {
    return this.examenesService.findAllExamenes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un examen específico por ID' })
  @ApiResponse({ status: 200, type: GetExamenDto })
  findOneExamen(@Param('id') id: string): GetExamenDto {
    return this.examenesService.findOneExamen(id);
  }

  @Get('orden/:ordenId')
  @ApiOperation({ summary: 'Obtener exámenes de una orden específica' })
  @ApiResponse({ status: 200, type: [GetExamenDto] })
  findExamenesByOrden(@Param('ordenId') ordenId: string): GetExamenDto[] {
    return this.examenesService.findExamenesByOrden(ordenId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar estado/resultados de un examen por ID' })
  @ApiResponse({ status: 200, type: GetExamenDto })
  updateExamen(
    @Param('id') id: string,
    @Body() updateExamenDto: Partial<CreateExamenDto>,
  ): GetExamenDto {
    return this.examenesService.updateExamen(id, updateExamenDto);
  }
}
