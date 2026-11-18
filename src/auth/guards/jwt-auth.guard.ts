import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException(
        'No autenticado: se requiere iniciar sesión (token JWT o cookie HttpOnly)',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'petlove_jwt_secret_key_2026',
      });
      request['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token JWT inválido o expirado');
    }
  }

  private extractToken(request: Request): string | undefined {
    // 1. Priorizar Cookie HttpOnly (requerido por Frontend)
    const cookieToken = (request as Request & { cookies?: Record<string, string> })
      .cookies?.['access_token'];
    if (cookieToken) {
      return cookieToken;
    }

    // 2. Soportar también Authorization: Bearer <token> (Swagger / Mobile)
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
