import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateEsp32MessageDto } from './dto/create-esp32-message.dto';

@Injectable()
export class Esp32Service {
  constructor(private readonly firebaseService: FirebaseService) {}

  async guardarLectura(createEsp32MessageDto: CreateEsp32MessageDto) {
    await this.firebaseService.firestore
      .collection('sensor')
      .doc('actual')
      .set({
        temperatura: createEsp32MessageDto.temperatura,
        humedad: createEsp32MessageDto.humedad,
      });

    return {
      id: 'actual',
      mensaje: 'Datos guardados correctamente',
    };
  }

  async obtenerUltimaLectura() {
    const document = await this.firebaseService.firestore
      .collection('sensor')
      .doc('actual')
      .get();

    if (!document.exists) {
      throw new NotFoundException('No hay lecturas registradas');
    }

    return { id: document.id, ...document.data() };
  }
}
