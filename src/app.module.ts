import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './firebase/firebase.service';
import { PruebaController } from './prueba/prueba.controller';
import { PruebaService } from './prueba/prueba.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, PruebaController],
  providers: [AppService, FirebaseService, PruebaService],
})
export class AppModule {}
