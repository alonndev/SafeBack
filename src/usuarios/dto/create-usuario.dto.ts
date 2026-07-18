import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsDateString()
  fechaNacimiento: string;
}
