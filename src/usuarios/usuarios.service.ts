import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

interface FirebaseLoginResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class UsuariosService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService,
  ) {}

  async registro(createUsuarioDto: CreateUsuarioDto) {
    try {
      const userRecord = await this.firebaseService.auth.createUser({
        email: createUsuarioDto.correo,
        password: createUsuarioDto.password,
        displayName: createUsuarioDto.nombre,
      });

      await this.firebaseService.firestore
        .collection('usuarios')
        .doc(userRecord.uid)
        .set({
          nombre: createUsuarioDto.nombre,
          correo: createUsuarioDto.correo,
          genero: createUsuarioDto.genero,
          telefono: createUsuarioDto.telefono,
          fechaNacimiento: createUsuarioDto.fechaNacimiento,
        });

      return { uid: userRecord.uid, mensaje: 'Usuario registrado correctamente' };
    } catch (error: unknown) {
      if (this.getFirebaseErrorCode(error) === 'auth/email-already-exists') {
        throw new ConflictException('El correo ya está registrado');
      }

      throw new InternalServerErrorException('No se pudo registrar el usuario');
    }
  }

  async autenticacion(loginUsuarioDto: LoginUsuarioDto) {
    const apiKey = this.configService.get<string>('FIREBASE_WEB_API_KEY');

    if (!apiKey) {
      throw new InternalServerErrorException(
        'Falta configurar FIREBASE_WEB_API_KEY',
      );
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginUsuarioDto.correo,
          password: loginUsuarioDto.password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const data = (await response.json()) as FirebaseLoginResponse;

    return {
      uid: data.localId,
      token: data.idToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
    };
  }

  private getFirebaseErrorCode(error: unknown): string | undefined {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const { code } = error as { code?: unknown };
      return typeof code === 'string' ? code : undefined;
    }

    return undefined;
  }
}
