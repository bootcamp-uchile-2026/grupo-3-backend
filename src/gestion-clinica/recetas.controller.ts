import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { GetRecetaDto } from './dto/get-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Gestión de Clínica - Recetas')
@Auth()
@Controller('gestion-clinica/recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  @Auth('VETERINARIO', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VETERINARIO', 'ADMIN')
  @ApiBearerAuth()
  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'Emitir una nueva receta (prescripción) para una consulta clínica (VETERINARIO o ADMIN)',
  })
  @ApiResponse({ status: 201, type: GetRecetaDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Permisos insuficientes (requiere rol VETERINARIO o ADMIN)' })
  create(@Body() createRecetaDto: CreateRecetaDto): Promise<GetRecetaDto> {
    return this.recetasService.create(createRecetaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las recetas emitidas' })
  @ApiResponse({ status: 200, type: [GetRecetaDto] })
  findAll(): Promise<GetRecetaDto[]> {
    return this.recetasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el detalle de una receta por ID' })
  @ApiResponse({ status: 200, type: GetRecetaDto })
  findOne(@Param('id') id: string): Promise<GetRecetaDto> {
    return this.recetasService.findOne(id);
  }

  @Put(':id')
  @Auth('VETERINARIO', 'ADMIN')
  @ApiOperation({ summary: 'Actualizar una receta por ID' })
  @ApiResponse({ status: 200, type: GetRecetaDto })
  update(
    @Param('id') id: string,
    @Body() updateRecetaDto: UpdateRecetaDto,
  ): Promise<GetRecetaDto> {
    return this.recetasService.update(id, updateRecetaDto);
  }

  @Delete(':id')
  @Auth('VETERINARIO', 'ADMIN')
  @ApiOperation({ summary: 'Eliminar una receta por ID' })
  remove(@Param('id') id: string) {
    return this.recetasService.remove(id);
  }
}
