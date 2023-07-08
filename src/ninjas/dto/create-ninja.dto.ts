import { IsEnum, MinLength, isEnum } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    name: string;

    @IsEnum(['stars', 'nunchucks'], { message: "Choose correct weapon!"})
    weapon: 'stars' | 'nunchucks';
}
