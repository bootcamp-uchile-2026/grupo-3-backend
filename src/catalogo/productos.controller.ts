import { UppercasePipe } from 'src/common/pipes/uppercase.pipe';
import { ProductoExistePipe } from 'src/common/pipes/producto-existe.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { GetProductoDto } from './dto/get-producto.dto';
import { FilterProductoDto } from './dto/filter-producto.dto';
import { CreateResenaDto } from './dto/create-resena.dto';
import { GetResenaDto } from './dto/get-resena.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

interface UploadedImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

const multerImageOptions = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      const uploadDir = join(process.cwd(), 'uploads', 'productos');
      mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = extname(file.originalname).toLowerCase();
      cb(null, `prod-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (
    _req: unknown,
    file: { mimetype: string; originalname: string },
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp|gif)$/)) {
      return cb(
        new BadRequestException(
          'Solo se permiten archivos de imagen (jpg, jpeg, png, webp, gif)',
        ),
        false,
      );
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
};

@ApiTags('Catálogo - Productos')
@Controller('catalogo/productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un nuevo producto al catálogo' })
  @ApiResponse({ status: 201, type: GetProductoDto })
  create(@Body() createProductoDto: CreateProductoDto): Promise<GetProductoDto> {
    return this.productosService.create(createProductoDto);
  }

  @Post('imagenes')
  @UseInterceptors(FileInterceptor('imagen', multerImageOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Subir una imagen de producto al servidor de archivos estáticos',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['imagen'],
      properties: {
        imagen: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen (jpg, png, webp, gif - máx 5MB)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Imagen almacenada exitosamente y disponible en /uploads/productos/...',
  })
  uploadImagen(@UploadedFile() file?: UploadedImageFile) {
    if (!file) {
      throw new BadRequestException('Debe adjuntar un archivo en el campo "imagen"');
    }
    return {
      filename: file.filename,
      url: `/uploads/productos/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  @Post(':id/imagenes')
  @UseInterceptors(FileInterceptor('imagen', multerImageOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Subir una imagen y asociarla directamente a la galería de un producto existente',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['imagen'],
      properties: {
        imagen: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen para agregar al producto',
        },
      },
    },
  })
  @ApiResponse({ status: 201, type: GetProductoDto })
  async uploadImagenProducto(
    @Param('id', ProductoExistePipe) id: string,
    @UploadedFile() file?: UploadedImageFile,
  ): Promise<GetProductoDto> {
    if (!file) {
      throw new BadRequestException('Debe adjuntar un archivo en el campo "imagen"');
    }
    const imageUrl = `/uploads/productos/${file.filename}`;
    return this.productosService.addImagen(id, imageUrl);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener productos con filtros, búsqueda, orden y paginación',
  })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  findAll(@Query() filterDto: FilterProductoDto): Promise<GetProductoDto[]> {
    return this.productosService.findAll(filterDto);
  }

  @Get('ofertas')
  @ApiOperation({
    summary: 'Obtener productos en oferta para la página principal',
  })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findOfertas(
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number,
  ): Promise<GetProductoDto[]> {
    return this.productosService.findOfertas(limit);
  }

  @Get('sugeridos')
  @ApiOperation({
    summary:
      'Obtener productos sugeridos para cross-selling ("¿Te faltó algo?")',
  })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findSugeridos(
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit: number,
  ): Promise<GetProductoDto[]> {
    return this.productosService.findSugeridos(limit);
  }

  @Get('buscar/:termino')
  @ApiOperation({ summary: 'Buscar producto (demostración de UppercasePipe)' })
  buscarPorTermino(@Param('termino', UppercasePipe) termino: string) {
    return {
      mensaje: 'El Pipe transformó exitosamente el parámetro a mayúsculas',
      terminoRecibido: termino,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener el detalle completo de un producto por ID',
  })
  @ApiResponse({ status: 200, type: GetProductoDto })
  findOne(@Param('id', ProductoExistePipe) id: string): Promise<GetProductoDto> {
    return this.productosService.findOne(id);
  }

  @Get(':id/relacionados')
  @ApiOperation({
    summary: 'Obtener productos relacionados para el carrusel de ficha',
  })
  @ApiResponse({ status: 200, type: [GetProductoDto] })
  findRelacionados(
    @Param('id') id: string,
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit: number,
  ): Promise<GetProductoDto[]> {
    return this.productosService.findRelacionados(id, limit);
  }

  @Get(':id/resenas')
  @ApiOperation({ summary: 'Obtener reseñas de clientes de un producto' })
  @ApiResponse({ status: 200, type: [GetResenaDto] })
  @ApiQuery({
    name: 'filtro',
    required: false,
    description: 'Filtro: positivas, neutras, criticas, 5, 4, etc.',
  })
  findResenas(
    @Param('id', ProductoExistePipe) id: string,
    @Query('filtro') filtro?: string,
  ): Promise<GetResenaDto[]> {
    return this.productosService.findResenas(id, filtro);
  }

  @Post(':id/resenas')
  @ApiOperation({ summary: 'Escribir una nueva reseña para un producto' })
  @ApiResponse({ status: 201, type: GetResenaDto })
  addResena(
    @Param('id', ProductoExistePipe) id: string,
    @Body() createResenaDto: CreateResenaDto,
  ): Promise<GetResenaDto> {
    return this.productosService.addResena(id, createResenaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiResponse({ status: 200, type: GetProductoDto })
  update(
    @Param('id', ProductoExistePipe) id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ): Promise<GetProductoDto> {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Eliminar un producto por ID (Solo ADMIN)' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Permisos insuficientes (requiere rol ADMIN)' })
  remove(@Param('id', ProductoExistePipe) id: string) {
    return this.productosService.remove(id);
  }
}
