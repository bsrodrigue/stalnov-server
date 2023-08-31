import { IsNumber } from "class-validator";

export class ReadDto {
  @IsNumber()
  chapterId: number;
}
