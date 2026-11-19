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
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { GetConsultaDto } from './dto/get-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Gestión de Clínica - Consultas')
@Auth()
@Controller('gestion-clinica/consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  @Auth('VETERINARIO', 'ADMIN')
  @ApiOperation({ summary: 'Registrar una nueva consulta clínica veterinaria' })
  @ApiResponse({ status: 201, type: GetConsultaDto })
  create(@Body() createConsultaDto: CreateConsultaDto): Promise<GetConsultaDto> {
    return this.consultasService.create(createConsultaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las consultas registradas' })
  @ApiResponse({ status: 200, type: [GetConsultaDto] })
  findAll(): Promise<GetConsultaDto[]> {
    return this.consultasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener el detalle de una consulta clínica por ID',
  })
  @ApiResponse({ status: 200, type: GetConsultaDto })
  findOne(@Param('id') id: string): Promise<GetConsultaDto> {
    return this.consultasService.findOne(id);
  }

  @Put(':id')
  @Auth('VETERINARIO', 'ADMIN')
  @ApiOperation({
    summary: 'Actualizar información de una consulta clínica por ID',
  })
  @ApiResponse({ status: 200, type: GetConsultaDto })
  update(
    @Param('id') id: string,
    @Body() updateConsultaDto: UpdateConsultaDto,
  ): Promise<GetConsultaDto> {
    return this.consultasService.update(id, updateConsultaDto);
  }

  @Delete(':id')
  @Auth('VETERINARIO', 'ADMIN')
  @ApiOperation({ summary: 'Eliminar una consulta clínica por ID' })
  remove(@Param('id') id: string) {
    return this.consultasService.remove(id);
  }
}
