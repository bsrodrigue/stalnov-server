import { IsNotEmpty } from "class-validator";

export class LibraryDto {
  @IsNotEmpty()
  novelId: number;
}
