import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEsp32MessageDto } from './dto/create-esp32-message.dto';
import { Esp32Service } from './esp32.service';

@Controller('esp32')
export class Esp32Controller {
  constructor(private readonly esp32Service: Esp32Service) {}

  @Get('lastreading')
  obtenerUltimaLectura() {
    return this.esp32Service.obtenerUltimaLectura();
  }

  @Post()
  recibirDatos(@Body() createEsp32MessageDto: CreateEsp32MessageDto) {
    return this.esp32Service.guardarLectura(createEsp32MessageDto);
  }
}
