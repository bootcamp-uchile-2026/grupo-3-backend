import { SetMetadata } from '@nestjs/common';

export type RolUsuario = 'DUENIO' | 'VETERINARIO' | 'ADMIN';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolUsuario[]) => SetMetadata(ROLES_KEY, roles);
