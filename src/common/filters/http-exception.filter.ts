import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtro global que transforma cualquier excepción en una respuesta HTTP
 * con formato uniforme, incluyendo el identificador de request para trazabilidad.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string | string[] = 'Error interno del servidor';

    if (exception instanceof HttpException) {
      // Errores controlados: validaciones, recursos no encontrados, etc.
      status = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
        error = exception.name;
      } else {
        const b = body as { message?: string | string[]; error?: string };
        message = b.message ?? exception.message;
        error = b.error ?? exception.name;
      }
    } else {
      // Errores inesperados: se registran con su detalle, pero no se exponen al cliente
      const err = exception as Error;
      this.logger.error(`[${req['requestId']}] ${err?.message}`, err?.stack);
    }

    res.status(status).json({
      statusCode: status,
      error,
      message,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      requestId: req['requestId'],
    });
  }
}