import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEsp32MessageDto {
  @IsString()
  @IsNotEmpty()
  temperatura: string;

  @IsString()
  @IsNotEmpty()
  humedad: string;
}
