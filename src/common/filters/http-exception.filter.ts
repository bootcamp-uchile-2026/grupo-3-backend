import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RecursoNoEncontradoError } from '../errors/recurso-noEncontrado.error';
import { StockInsuficienteError } from '../errors/stock-insuficiente.error';
import { ReglaNegocioError } from '../errors/regla-negocio.error';

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
    const req = ctx.getRequest<Request & { requestId?: string }>();
    const requestId = req.requestId;

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
    } else if (exception instanceof RecursoNoEncontradoError) {
      status = HttpStatus.NOT_FOUND;
      error = 'Not Found';
      message = exception.message;
    } else if (exception instanceof StockInsuficienteError) {
      status = HttpStatus.CONFLICT;
      error = 'Conflict';
      message = exception.message;
    } else if (exception instanceof ReglaNegocioError) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
      message = exception.message;
    } else {
      // Errores inesperados: se registran con su detalle, pero no se exponen al cliente
      const err = exception as Error;
      this.logger.error(`[${requestId}] ${err?.message}`, err?.stack);
    }

    res.status(status).json({
      statusCode: status,
      error,
      message,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      requestId,
    });
  }
}
