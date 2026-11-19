import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles, RolUsuario } from './roles.decorator';

export function Auth(...roles: RolUsuario[]) {
  const decoradores = [ApiBearerAuth(), UseGuards(JwtAuthGuard, RolesGuard)];
  if (roles.length > 0) {
    decoradores.push(Roles(...roles));
  }
  return applyDecorators(...decoradores);
}