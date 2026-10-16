import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto, GetDireccionDto } from './dto/direccion.dto';

@ApiTags('Usuarios - Libreta de Direcciones')
@Controller('usuarios')
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @Get(':usuarioId/direcciones')
  @ApiOperation({ summary: 'Obtener todas las direcciones guardadas de un usuario' })
  @ApiResponse({ status: 200, type: [GetDireccionDto] })
  findByUsuario(@Param('usuarioId') usuarioId: string): GetDireccionDto[] {
    return this.direccionesService.findByUsuario(usuarioId);
  }

  @Post(':usuarioId/direcciones')
  @ApiOperation({ summary: 'Agregar una nueva dirección a la libreta del usuario' })
  @ApiResponse({ status: 201, type: GetDireccionDto })
  create(
    @Param('usuarioId') usuarioId: string,
    @Body() dto: CreateDireccionDto,
  ): GetDireccionDto {
    return this.direccionesService.create(usuarioId, dto);
  }

  @Patch(':usuarioId/direcciones/:direccionId/predeterminada')
  @ApiOperation({ summary: 'Marcar una dirección como predeterminada' })
  @ApiResponse({ status: 200, type: GetDireccionDto })
  setPredeterminada(
    @Param('usuarioId') usuarioId: string,
    @Param('direccionId') direccionId: string,
  ): GetDireccionDto {
    return this.direccionesService.setPredeterminada(usuarioId, direccionId);
  }

  @Delete(':usuarioId/direcciones/:direccionId')
  @ApiOperation({ summary: 'Eliminar una dirección guardada' })
  remove(
    @Param('usuarioId') usuarioId: string,
    @Param('direccionId') direccionId: string,
  ) {
    return this.direccionesService.remove(usuarioId, direccionId);
  }
}
