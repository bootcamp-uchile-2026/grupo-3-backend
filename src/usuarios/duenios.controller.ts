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
import { DueniosService } from './duenios.service';
import { CreateDuenioDto } from './dto/create-duenio.dto';
import { GetDuenioDto } from './dto/get-duenio.dto';
import { UpdateDuenioDto } from './dto/update-duenio.dto';

@ApiTags('Usuarios - Dueños de Mascotas')
@Controller('usuarios/duenios')
export class DueniosController {
  constructor(private readonly dueniosService: DueniosService) { }

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo dueño de mascota' })
  @ApiResponse({ status: 201, type: GetDuenioDto })
  create(@Body() createDuenioDto: CreateDuenioDto): Promise<GetDuenioDto> {
    return this.dueniosService.create(createDuenioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los dueños' })
  @ApiResponse({ status: 200, type: [GetDuenioDto] })
  findAll(): Promise<GetDuenioDto[]> {
    return this.dueniosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un dueño por ID' })
  @ApiResponse({ status: 200, type: GetDuenioDto })
  findOne(@Param('id') id: string): Promise<GetDuenioDto> {
    return this.dueniosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un dueño por ID' })
  @ApiResponse({ status: 200, type: GetDuenioDto })
  update(
    @Param('id') id: string,
    @Body() updateDuenioDto: UpdateDuenioDto,
  ): Promise<GetDuenioDto> {
    return this.dueniosService.update(id, updateDuenioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un dueño por ID' })
  remove(@Param('id') id: string) {
    return this.dueniosService.remove(id);
  }
}
