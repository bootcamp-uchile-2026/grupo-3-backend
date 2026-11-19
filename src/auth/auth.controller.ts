import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponseDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { CreateDuenioDto } from '../usuarios/dto/create-duenio.dto';
import { GetDuenioDto } from '../usuarios/dto/get-duenio.dto';

@ApiTags('Autenticación y Autorización')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario dueño con contraseña encriptada (bcrypt)',
  })
  @ApiResponse({ status: 201, type: GetDuenioDto })
  async register(@Body() createDuenioDto: CreateDuenioDto): Promise<GetDuenioDto> {
    return this.authService.register(createDuenioDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión (emite JWT en respuesta y en cookie HttpOnly access_token)',
  })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.login(loginDto);

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    });

    return result;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cerrar sesión (elimina la cookie HttpOnly access_token)' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Sesión cerrada correctamente' };
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado actual' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario autenticado' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  getPerfil(@Req() req: Request) {
    return req['user'];
  }

  @Get('admin-check')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'Verificar acceso exclusivo para perfil ADMIN (demostración de autorización por rol)',
  })
  @ApiResponse({ status: 200, description: 'Acceso autorizado para ADMIN' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Permisos insuficientes (Rol distinto de ADMIN)' })
  adminCheck(@Req() req: Request) {
    return {
      message: 'Acceso autorizado al panel de administración',
      usuario: req['user'],
    };
  }
}
