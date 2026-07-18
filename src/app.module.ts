import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './firebase/firebase.service';
import { PruebaController } from './prueba/prueba.controller';
import { PruebaService } from './prueba/prueba.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, PruebaController, UsuariosController],
  providers: [
    AppService,
    FirebaseService,
    PruebaService,
    UsuariosService,
  ],
})
export class AppModule {}
