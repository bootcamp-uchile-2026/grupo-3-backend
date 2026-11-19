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
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Usuarios - Veterinarios')
@Controller('usuarios/veterinarios')
export class VeterinariosController {
  constructor(private readonly veterinariosService: VeterinariosService) {}

  @Post()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'Registrar un nuevo veterinario' })
  @ApiResponse({ status: 201, type: GetVeterinarioDto })
  create(
    @Body() createVeterinarioDto: CreateVeterinarioDto,
  ): Promise<GetVeterinarioDto> {
    return this.veterinariosService.create(createVeterinarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los veterinarios' })
  @ApiResponse({ status: 200, type: [GetVeterinarioDto] })
  findAll(): Promise<GetVeterinarioDto[]> {
    return this.veterinariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un veterinario por ID' })
  @ApiResponse({ status: 200, type: GetVeterinarioDto })
  findOne(@Param('id') id: string): Promise<GetVeterinarioDto> {
    return this.veterinariosService.findOne(id);
  }

  @Put(':id')
  @Auth('ADMIN')
  @ApiOperation({ summary: 'Actualizar un veterinario por ID' })
  @ApiResponse({ status: 200, type: GetVeterinarioDto })
  update(
    @Param('id') id: string,
    @Body() updateVeterinarioDto: UpdateVeterinarioDto,
  ): Promise<GetVeterinarioDto> {
    return this.veterinariosService.update(id, updateVeterinarioDto);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @ApiOperation({ summary: 'Eliminar un veterinario por ID' })
  remove(@Param('id') id: string) {
    return this.veterinariosService.remove(id);
  }
}
