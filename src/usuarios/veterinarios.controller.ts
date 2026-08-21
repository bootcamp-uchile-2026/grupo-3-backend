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
import { VeterinariosService } from './veterinarios.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { GetVeterinarioDto } from './dto/get-veterinario.dto';

@ApiTags('Usuarios - Veterinarios')
@Controller('usuarios/veterinarios')
export class VeterinariosController {
  constructor(private readonly veterinariosService: VeterinariosService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo veterinario' })
  @ApiResponse({ status: 201, type: GetVeterinarioDto })
  create(
    @Body() createVeterinarioDto: CreateVeterinarioDto,
  ): GetVeterinarioDto {
    return this.veterinariosService.create(createVeterinarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los veterinarios' })
  @ApiResponse({ status: 200, type: [GetVeterinarioDto] })
  findAll(): GetVeterinarioDto[] {
    return this.veterinariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un veterinario por ID' })
  @ApiResponse({ status: 200, type: GetVeterinarioDto })
  findOne(@Param('id') id: string): GetVeterinarioDto {
    return this.veterinariosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un veterinario por ID' })
  @ApiResponse({ status: 200, type: GetVeterinarioDto })
  update(
    @Param('id') id: string,
    @Body() updateVeterinarioDto: Partial<CreateVeterinarioDto>,
  ): GetVeterinarioDto {
    return this.veterinariosService.update(id, updateVeterinarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un veterinario por ID' })
  remove(@Param('id') id: string) {
    return this.veterinariosService.remove(id);
  }
}
