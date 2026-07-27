import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsEnum,
  ValidateNested,
  ArrayMaxSize,
  IsUrl
} from 'class-validator';
import { Type } from 'class-transformer';

// ==================== ENUMS ====================

export enum Genero {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
  OTRO = 'otro'
}

export enum TipoSangre {
  A_POSITIVO = 'A+',
  A_NEGATIVO = 'A-',
  B_POSITIVO = 'B+',
  B_NEGATIVO = 'B-',
  AB_POSITIVO = 'AB+',
  AB_NEGATIVO = 'AB-',
  O_POSITIVO = 'O+',
  O_NEGATIVO = 'O-'
}

export enum SensibilidadCaida {
  ALTA = 'alta',
  MEDIA = 'media',
  BAJA = 'baja'
}

export enum Parentesco {
  HIJO = 'hijo/a',
  ESPOSO = 'esposo/a',
  HERMANO = 'hermano/a',
  CUIDADOR = 'cuidador',
  OTRO = 'otro'
}

export enum FrecuenciaDesmayo {
  NUNCA = 'nunca',
  UNA_VEZ = 'una vez',
  OCASIONAL = 'ocasional',
  FRECUENTE = 'frecuente'
}

export enum NumeroEmergencia {
  EEUU = '911',
  MEXICO = '911',
  ESPANA = '112',
  ARGENTINA = '107',
  COLOMBIA = '123'
}

// ==================== DTOs ANIDADOS ====================

export class DireccionDto {
  @IsString()
  @IsNotEmpty()
  calle: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsOptional()
  codigoPostal?: string;

  @IsString()
  @IsOptional()
  pais?: string;
}

export class EnfermedadesCardiacasDto {
  @IsBoolean()
  arritmia: boolean;

  @IsBoolean()
  bradicardia: boolean;

  @IsBoolean()
  taquicardia: boolean;

  @IsBoolean()
  fibrilacionAuricular: boolean;

  @IsBoolean()
  insuficienciaCardiaca: boolean;

  @IsBoolean()
  hipertension: boolean;

  @IsBoolean()
  hipotension: boolean;

  @IsBoolean()
  cardiopatiaIsquemica: boolean;

  @IsBoolean()
  infartoPrevio: boolean;

  @IsString()
  @IsOptional()
  otra?: string;
}

export class MedicamentosDto {
  @IsBoolean()
  betabloqueadores: boolean;

  @IsBoolean()
  digitalicos: boolean;

  @IsBoolean()
  antiarritmicos: boolean;

  @IsBoolean()
  calcioantagonistas: boolean;

  @IsBoolean()
  ninguno: boolean;

  @IsString()
  @IsOptional()
  otros?: string;
}

export class HistorialDesmayoDto {
  @IsBoolean()
  haSufrido: boolean;

  @IsOptional()
  @IsEnum(FrecuenciaDesmayo)
  frecuencia?: FrecuenciaDesmayo;

  @IsOptional()
  @IsDateString()
  ultimoEpisodio?: string;
}

export class HistorialCaidasDto {
  @IsBoolean()
  haSufrido: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  caidasUltimoAno?: number;
}

export class AlertThresholdsDto {
  @IsNumber()
  @Min(80)
  @Max(200)
  pulsoMaximo: number;

  @IsNumber()
  @Min(30)
  @Max(100)
  pulsoMinimo: number;

  @IsEnum(SensibilidadCaida)
  sensibilidadCaida: SensibilidadCaida;
}

export class TutorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nombreCompleto: string;

  @IsEnum(Parentesco)
  parentesco: Parentesco;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  telefonoPrincipal: string;

  @IsOptional()
  @IsString()
  telefonoAlternativo?: string;

  @IsEmail()
  correoElectronico: string;

  @IsBoolean()
  recibirSMS: boolean;

  @IsBoolean()
  recibirCorreo: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => DireccionDto)
  direccionEmergencia?: DireccionDto;
}

export class ContactoEmergenciaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  telefono: string;

  @IsString()
  @IsNotEmpty()
  parentesco: string;

  @IsBoolean()
  llamarAutomaticamente: boolean;
}

export class AlertConfigDto {
  @IsBoolean()
  deteccionCaidasActivada: boolean;

  @IsNumber()
  @Min(5)
  @Max(120)
  tiempoInactividadAlerta: number;

  @IsBoolean()
  notificarTutorPulsoAnormal: boolean;

  @IsEnum(NumeroEmergencia)
  numeroEmergencias: NumeroEmergencia;
}

// ==================== DTO PRINCIPAL ====================

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nombreCompleto: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsEnum(Genero)
  genero: Genero;

  @IsNumber()
  @Min(30)
  @Max(300)
  peso: number;

  @IsNumber()
  @Min(100)
  @Max(250)
  altura: number;

  @IsEnum(TipoSangre)
  tipoSangre: TipoSangre;

  @IsOptional()
  @IsUrl()
  fotoPerfil?: string;

  @ValidateNested()
  @Type(() => DireccionDto)
  direccion: DireccionDto;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  telefonoContacto: string;

  @IsBoolean()
  tieneMarcapasos: boolean;

  @ValidateNested()
  @Type(() => EnfermedadesCardiacasDto)
  enfermedadesCardiacas: EnfermedadesCardiacasDto;

  @ValidateNested()
  @Type(() => MedicamentosDto)
  medicamentos: MedicamentosDto;

  @IsNumber()
  @Min(40)
  @Max(100)
  frecuenciaCardiacaReposo: number;

  @ValidateNested()
  @Type(() => HistorialDesmayoDto)
  historialDesmayos: HistorialDesmayoDto;

  @ValidateNested()
  @Type(() => HistorialCaidasDto)
  historialCaidas: HistorialCaidasDto;

  @IsBoolean()
  usaDesfibrilador: boolean;

  @ValidateNested()
  @Type(() => AlertThresholdsDto)
  umbralesAlerta: AlertThresholdsDto;

  @ValidateNested()
  @Type(() => TutorDto)
  tutor: TutorDto;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(3)
  @Type(() => ContactoEmergenciaDto)
  contactosEmergencia: ContactoEmergenciaDto[];

  @ValidateNested()
  @Type(() => AlertConfigDto)
  configuracionAlertas: AlertConfigDto;
}