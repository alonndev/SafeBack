import { Body, Controller, Post } from '@nestjs/common';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { PruebaService } from './prueba.service';

@Controller('prueba')
export class PruebaController {
  constructor(private readonly pruebaService: PruebaService) {}

  @Post()
  create(@Body() createPruebaDto: CreatePruebaDto) {
    return this.pruebaService.create(createPruebaDto);
  }
}
