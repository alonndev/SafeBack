import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  registro(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.registro(createPacienteDto);
  }

  @Get()
  getPacientes() {
    return this.pacientesService.getPacientes();
  }

  @Get(':id')
  getPacienteById(@Param('id') id: string) {
    return this.pacientesService.getPacienteById(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.actualizar(id, updatePacienteDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.pacientesService.eliminar(id);
  }
}