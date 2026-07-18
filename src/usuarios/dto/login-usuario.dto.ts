import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  password: string;
}
