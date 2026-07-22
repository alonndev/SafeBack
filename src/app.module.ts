import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './firebase/firebase.service';
import { Esp32Controller } from './esp32/esp32.controller';
import { Esp32Service } from './esp32/esp32.service';
import { PruebaController } from './prueba/prueba.controller';
import { PruebaService } from './prueba/prueba.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, PruebaController, UsuariosController, Esp32Controller],
  providers: [
    AppService,
    FirebaseService,
    Esp32Service,
    PruebaService,
    UsuariosService,
  ],
})
export class AppModule {}
