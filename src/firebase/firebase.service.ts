import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
  readonly firestore: Firestore;
  readonly auth: Auth;

  constructor(configService: ConfigService) {
    const projectId = configService.getOrThrow<string>('FIREBASE_PROJECT_ID');
    const clientEmail = configService.getOrThrow<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = configService
      .getOrThrow<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n');

    const app = getApps().length
      ? getApp()
      : initializeApp({
          credential: cert({ projectId, clientEmail, privateKey }),
        });

    this.firestore = getFirestore(app);
    this.auth = getAuth(app);
  }
}
