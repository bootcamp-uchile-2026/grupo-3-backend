import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DueniosService } from '../usuarios/duenios.service';
import { VeterinariosService } from '../usuarios/veterinarios.service';
import { LoginDto, AuthResponseDto } from './dto/login.dto';
import { CreateDuenioDto } from '../usuarios/dto/create-duenio.dto';
import { GetDuenioDto } from '../usuarios/dto/get-duenio.dto';
import { CredencialesInvalidasError } from 'src/common/errors/credenciales-invalidas.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly dueniosService: DueniosService,
    private readonly veterinariosService: VeterinariosService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createDuenioDto: CreateDuenioDto): Promise<GetDuenioDto> {
    return this.dueniosService.create(createDuenioDto);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { correoElectronico, password } = loginDto;

    // Buscar primero en dueños (incluye rol DUENIO y ADMIN) y luego en veterinarios
    const duenio = await this.dueniosService.findByEmail(correoElectronico);
    const veterinario = !duenio
      ? await this.veterinariosService.findByEmail(correoElectronico)
      : null;

    const user = duenio || veterinario;
    if (!user || !user.password) {
      throw new CredencialesInvalidasError();
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new CredencialesInvalidasError();
    }

    const rol = user.rol || (veterinario ? 'VETERINARIO' : 'DUENIO');
    const payload = {
      sub: user.id,
      correoElectronico: user.correoElectronico,
      nombre: user.nombre,
      apellidos: user.apellidos,
      rol,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        correoElectronico: user.correoElectronico,
        rol,
      },
    };
  }
}
