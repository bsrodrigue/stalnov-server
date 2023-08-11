import { Gender, NovelGenre } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

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

    @IsOptional()
    bio?: string;

    @IsOptional()
    avatarUrl?: string;

    @IsOptional()
    favouriteGenres?: Array<NovelGenre>;
}

export class UpdateUserProfileDto {
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsOptional()
    username: string;

    @IsOptional()
    @IsEnum(Gender)
    gender: Gender;

    @IsOptional()
    birthdate?: Date;

    @IsOptional()
    bio?: string;

    @IsOptional()
    avatarUrl?: string;

    @IsOptional()
    favouriteGenres?: Array<NovelGenre>;
}
