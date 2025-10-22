import { Type } from "class-transformer";
import { IsAlphanumeric, IsDate, IsDateString, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export enum Country {
    IND = 'IND',
    USA = 'USA',
    UK = 'UK',
}

export class AuthDto {
    @IsString()
    @Length(3, 20)
    name: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(8, {
        message: "Password is too short, minimal length required is of $constraint1 characters",

    })
    @MaxLength(32)
    password: string;

    @IsEnum(Country)
    country: string;

    @IsDateString()
    //@Type(() => Date)
    dateOfBirth: Date;

    @IsOptional()
    @IsNumber()
    phone: number;
}