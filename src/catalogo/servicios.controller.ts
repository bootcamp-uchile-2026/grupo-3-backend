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
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { GetServicioDto } from './dto/get-servicio.dto';

@ApiTags('Catálogo - Servicios')
@Controller('catalogo/servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un nuevo servicio al catálogo' })
  @ApiResponse({ status: 201, type: GetServicioDto })
  create(@Body() createServicioDto: CreateServicioDto): GetServicioDto {
    return this.serviciosService.create(createServicioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los servicios' })
  @ApiResponse({ status: 200, type: [GetServicioDto] })
  findAll(): GetServicioDto[] {
    return this.serviciosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un servicio por ID' })
  @ApiResponse({ status: 200, type: GetServicioDto })
  findOne(@Param('id') id: string): GetServicioDto {
    return this.serviciosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un servicio por ID' })
  @ApiResponse({ status: 200, type: GetServicioDto })
  update(
    @Param('id') id: string,
    @Body() updateServicioDto: Partial<CreateServicioDto>,
  ): GetServicioDto {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un servicio por ID' })
  remove(@Param('id') id: string) {
    return this.serviciosService.remove(id);
  }
}
