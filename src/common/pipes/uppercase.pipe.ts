import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

/**
 * Pipe personalizado que convierte un string a mayúsculas.
 * Si el valor no es un string, lanza un BadRequestException.
 */
@Injectable()
export class UppercasePipe implements PipeTransform<string, string> {
    transform(value: string): string {
        if (typeof value !== 'string') {
            throw new BadRequestException('El valor debe ser una cadena de texto');
        }
        return value.toUpperCase();
    }
}
