
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    titulo: string

    @IsNotEmpty()
    descripcion: string
}