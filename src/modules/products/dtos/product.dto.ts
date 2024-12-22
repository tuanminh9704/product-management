import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    // @IsNumber()
    // @IsNotEmpty()
    price: number;

    // @IsString()
    // @IsNotEmpty()
    thumbnail: string;
}

export class UpdateProductDto {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}