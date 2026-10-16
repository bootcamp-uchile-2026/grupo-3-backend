import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Reutiliza el ID si el cliente lo envía; si no, genera uno nuevo
    const requestId = (req.headers['x-request-id'] as string) ?? randomUUID();
    req['requestId'] = requestId; // Disponible para los siguientes middlewares
    res.setHeader('X-Request-Id', requestId); // Se devuelve al cliente para trazabilidad
    next();
  }
}