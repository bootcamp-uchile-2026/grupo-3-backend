import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = crypto.randomUUID(); //Genera un id unico por request
        req['requestId'] = requestId; //Agrega el id unico al request
        console.log('[REQUEST]', requestId); //Imprime el id unico por request
        next(); //Pasa al siguiente middleware
    }
}
