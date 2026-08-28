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
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { GetMascotaDto } from './dto/get-mascota.dto';

@ApiTags('Usuarios - Mascotas (Ficha Clínica)')
@Controller('usuarios/mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva mascota (Ficha Mascota)' })
  @ApiResponse({ status: 201, type: GetMascotaDto })
  create(@Body() createMascotaDto: CreateMascotaDto): GetMascotaDto {
    return this.mascotasService.create(createMascotaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las mascotas' })
  @ApiResponse({ status: 200, type: [GetMascotaDto] })
  findAll(): GetMascotaDto[] {
    return this.mascotasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una mascota por ID' })
  @ApiResponse({ status: 200, type: GetMascotaDto })
  findOne(@Param('id') id: string): GetMascotaDto {
    return this.mascotasService.findOne(id);
  }

  @Get('duenio/:duenioId')
  @ApiOperation({ summary: 'Obtener mascotas de un dueño específico' })
  @ApiResponse({ status: 200, type: [GetMascotaDto] })
  findByDuenio(@Param('duenioId') duenioId: string): GetMascotaDto[] {
    return this.mascotasService.findByDuenio(duenioId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una mascota por ID' })
  @ApiResponse({ status: 200, type: GetMascotaDto })
  update(
    @Param('id') id: string,
    @Body() updateMascotaDto: Partial<CreateMascotaDto>,
  ): GetMascotaDto {
    return this.mascotasService.update(id, updateMascotaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una mascota por ID' })
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(id);
  }
}
