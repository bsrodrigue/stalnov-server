import { NovelGenre } from "@prisma/client";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateNovelDto {
  @IsOptional()
  coverUrl: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(NovelGenre)
  genre: NovelGenre;

  @IsNotEmpty()
  @IsBoolean()
  isMature: boolean;
}

export class UpdateNovelDto {
  @IsNotEmpty()
  novelId: number;

  @IsOptional()
  coverUrl: string;

  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(NovelGenre)
  genre: NovelGenre;

  @IsOptional()
  @IsBoolean()
  isMature: boolean;
}

export class CreateChapterDto {
  @IsNotEmpty()
  novelId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}

export class UpdateChapterDto {
  @IsNotEmpty()
  chapterId: number;

  @IsOptional()
  title: string;

  @IsOptional()
  body: string;
}

export class DeleteNovelDto {
  @IsNotEmpty()
  novelId: number;
}

export class DeleteChapterDto {
  @IsNotEmpty()
  chapterId: number;
}
