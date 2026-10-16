import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(req.method, req.originalUrl, req['requestId']); //Imprime el metodo, la url y el id del request
        next(); //Pasa al siguiente middleware
    }
}
