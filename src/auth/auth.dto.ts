import { Gender, NovelGenre } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class ResetPasswordDto {

}

export class ChangePasswordDto {
    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    password: string;
}

export class ChangeEmailDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class SetupAccountDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @IsOptional()
    birthdate?: Date;

    bio?: string;
    avatarUrl?: string;
    favouriteGenres?: Array<NovelGenre>;
}
