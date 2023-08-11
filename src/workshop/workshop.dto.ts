import { NovelGenre } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateNovelDto {

    coverUrl: string;
    title: string;
    description: string;
    genre: NovelGenre;
    isMature: boolean;
}