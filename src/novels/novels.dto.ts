import { IsNotEmpty } from "class-validator";

export class SearchDto {
  @IsNotEmpty()
  searchTerms: string;
}
