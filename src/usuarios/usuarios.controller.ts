import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  registro(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.registro(createUsuarioDto);
  }

  @Post('autenticacion')
  autenticacion(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.usuariosService.autenticacion(loginUsuarioDto);
  }

  @Get('users')
  getusers(){
    return this.usuariosService.getUsers();

  }
}
