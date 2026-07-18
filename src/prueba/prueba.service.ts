import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreatePruebaDto } from './dto/create-prueba.dto';

@Injectable()
export class PruebaService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createPruebaDto: CreatePruebaDto) {
    const document = await this.firebaseService.firestore
      .collection('test')
      .add({ mensaje: createPruebaDto.mensaje });

    return { id: document.id, mensaje: createPruebaDto.mensaje };
  }
}
