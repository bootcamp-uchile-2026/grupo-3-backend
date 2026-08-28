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
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { GetCitaDto } from './dto/get-cita.dto';

@ApiTags('Usuarios - Agenda de Citas')
@Controller('usuarios/citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  @ApiOperation({ summary: 'Reservar/Agendar una nueva cita' })
  @ApiResponse({ status: 201, type: GetCitaDto })
  create(@Body() createCitaDto: CreateCitaDto): GetCitaDto {
    return this.citasService.create(createCitaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las citas programadas' })
  @ApiResponse({ status: 200, type: [GetCitaDto] })
  findAll(): GetCitaDto[] {
    return this.citasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cita por ID' })
  @ApiResponse({ status: 200, type: GetCitaDto })
  findOne(@Param('id') id: string): GetCitaDto {
    return this.citasService.findOne(id);
  }

  @Get('duenio/:duenioId')
  @ApiOperation({ summary: 'Obtener citas de un dueño específico' })
  @ApiResponse({ status: 200, type: [GetCitaDto] })
  findByDuenio(@Param('duenioId') duenioId: string): GetCitaDto[] {
    return this.citasService.findByDuenio(duenioId);
  }

  @Get('veterinario/:veterinarioId')
  @ApiOperation({ summary: 'Obtener citas de un veterinario específico' })
  @ApiResponse({ status: 200, type: [GetCitaDto] })
  findByVeterinario(
    @Param('veterinarioId') veterinarioId: string,
  ): GetCitaDto[] {
    return this.citasService.findByVeterinario(veterinarioId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar/Reprogramar una cita por ID' })
  @ApiResponse({ status: 200, type: GetCitaDto })
  update(
    @Param('id') id: string,
    @Body() updateCitaDto: Partial<CreateCitaDto>,
  ): GetCitaDto {
    return this.citasService.update(id, updateCitaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar/Eliminar una cita por ID' })
  remove(@Param('id') id: string) {
    return this.citasService.remove(id);
  }
}
