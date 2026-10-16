import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const inicio = Date.now();

    // 'finish' se ejecuta cuando la respuesta ya fue enviada (flujo OK o de error)
    res.on('finish', () => {
      const duracion = Date.now() - inicio;
      const mensaje = `[${req['requestId']}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duracion}ms`;

      if (res.statusCode >= 500) {
        this.logger.error(mensaje);
      } else if (res.statusCode >= 400) {
        this.logger.warn(mensaje);
      } else {
        this.logger.log(mensaje);
      }
    });

    next();
  }
}