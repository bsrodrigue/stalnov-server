import { IsEmail, IsNotEmpty } from "class-validator";

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