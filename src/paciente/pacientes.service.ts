import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class PacientesService {
    constructor(private readonly firebaseService: FirebaseService) { }

    private readonly collection = 'pacientes';

    async registro(createPacienteDto: CreatePacienteDto) {
        try {
            const docRef = this.firebaseService.firestore
                .collection(this.collection)
                .doc();

            const paciente = {
                ...instanceToPlain(createPacienteDto), // 👈 fix aquí
                createdAt: new Date().toISOString(),
            };

            await docRef.set(paciente);

            return {
                id: docRef.id,
                mensaje: 'Paciente registrado correctamente',
            };
        } catch (error: unknown) {
            console.error('Error al registrar paciente:', error);
            throw new InternalServerErrorException(
                'No se pudo registrar el paciente',
            );
        }
    }

    async getPacientes() {
        try {
            const pacientes = await this.firebaseService.firestore
                .collection(this.collection)
                .get();

            return pacientes.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error: unknown) {
            throw new InternalServerErrorException(
                'No se pudieron obtener los pacientes',
            );
        }
    }

    async getPacienteById(id: string) {
        const document = await this.firebaseService.firestore
            .collection(this.collection)
            .doc(id)
            .get();

        if (!document.exists) {
            throw new NotFoundException(`Paciente con id ${id} no encontrado`);
        }

        return { id: document.id, ...document.data() };
    }

    async actualizar(id: string, updatePacienteDto: UpdatePacienteDto) {
        const docRef = this.firebaseService.firestore
            .collection(this.collection)
            .doc(id);

        const document = await docRef.get();

        if (!document.exists) {
            throw new NotFoundException(`Paciente con id ${id} no encontrado`);
        }

        try {
            const datosActualizados = {
                ...instanceToPlain(updatePacienteDto), // 👈 mismo fix aquí
                updatedAt: new Date().toISOString(),
            };

            await docRef.update(datosActualizados);

            return {
                id,
                mensaje: 'Paciente actualizado correctamente',
            };
        } catch (error: unknown) {
            console.error('Error al actualizar paciente:', error);
            throw new InternalServerErrorException(
                'No se pudo actualizar el paciente',
            );
        }
    }

    async eliminar(id: string) {
        const docRef = this.firebaseService.firestore
            .collection(this.collection)
            .doc(id);

        const document = await docRef.get();

        if (!document.exists) {
            throw new NotFoundException(`Paciente con id ${id} no encontrado`);
        }

        try {
            await docRef.delete();

            return {
                id,
                mensaje: 'Paciente eliminado correctamente',
            };
        } catch (error: unknown) {
            throw new InternalServerErrorException(
                'No se pudo eliminar el paciente',
            );
        }
    }

    private getFirebaseErrorCode(error: unknown): string | undefined {
        if (typeof error === 'object' && error !== null && 'code' in error) {
            const { code } = error as { code?: unknown };
            return typeof code === 'string' ? code : undefined;
        }

        return undefined;
    }
}