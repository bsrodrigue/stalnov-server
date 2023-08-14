import { IsNotEmpty } from "class-validator";

export class LikeChapterDto {
  @IsNotEmpty()
  chapterId: number;
}
