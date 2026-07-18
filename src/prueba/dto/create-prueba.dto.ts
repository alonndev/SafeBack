import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePruebaDto {
  @IsString()
  @IsNotEmpty()
  mensaje: string;
}
