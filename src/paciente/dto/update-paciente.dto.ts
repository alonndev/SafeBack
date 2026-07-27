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
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  Genero,
  TipoSangre,
  SensibilidadCaida,
  Parentesco,
  FrecuenciaDesmayo,
  NumeroEmergencia,
  DireccionDto,
  EnfermedadesCardiacasDto,
  MedicamentosDto,
  HistorialDesmayoDto,
  HistorialCaidasDto,
  AlertThresholdsDto,
  TutorDto,
  ContactoEmergenciaDto,
  AlertConfigDto,
} from './create-paciente.dto';

export class UpdatePacienteDto {
  // ============ SECCIÓN 1: DATOS PERSONALES ============
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nombreCompleto?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsEnum(Genero)
  genero?: Genero;

  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(300)
  peso?: number;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(250)
  altura?: number;

  @IsOptional()
  @IsEnum(TipoSangre)
  tipoSangre?: TipoSangre;

  @IsOptional()
  @IsUrl()
  fotoPerfil?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DireccionDto)
  direccion?: DireccionDto;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  telefonoContacto?: string;

  // ============ SECCIÓN 2: INFORMACIÓN MÉDICA ============
  @IsOptional()
  @IsBoolean()
  tieneMarcapasos?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => EnfermedadesCardiacasDto)
  enfermedadesCardiacas?: EnfermedadesCardiacasDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MedicamentosDto)
  medicamentos?: MedicamentosDto;

  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(100)
  frecuenciaCardiacaReposo?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => HistorialDesmayoDto)
  historialDesmayos?: HistorialDesmayoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HistorialCaidasDto)
  historialCaidas?: HistorialCaidasDto;

  @IsOptional()
  @IsBoolean()
  usaDesfibrilador?: boolean;

  // ============ SECCIÓN 3: UMBRALES DE ALERTA ============
  @IsOptional()
  @ValidateNested()
  @Type(() => AlertThresholdsDto)
  umbralesAlerta?: AlertThresholdsDto;

  // ============ SECCIÓN 4: TUTOR ============
  @IsOptional()
  @ValidateNested()
  @Type(() => TutorDto)
  tutor?: TutorDto;

  // ============ SECCIÓN 5: CONTACTOS DE EMERGENCIA ============
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(3)
  @Type(() => ContactoEmergenciaDto)
  contactosEmergencia?: ContactoEmergenciaDto[];

  // ============ SECCIÓN 6: CONFIGURACIÓN DE ALERTAS ============
  @IsOptional()
  @ValidateNested()
  @Type(() => AlertConfigDto)
  configuracionAlertas?: AlertConfigDto;
}