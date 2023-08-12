import { Controller, Get, Req } from "@nestjs/common";
import { NovelsService } from "./novels.service";
import { Request } from "src/types";

function getAge(birthdateString: string) {
  const today = new Date();
  const birthdate = new Date(birthdateString);
  let age = today.getFullYear() - birthdate.getFullYear();
  let m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}

@Controller("api/novels")
export class NovelsController {
  constructor(
    private novelsService: NovelsService,
  ) {}

  @Get("")
  async getPublicNovels(@Req() { jwt: { user: { birthdate } } }: Request) {
    const birthdateString = new Date(birthdate).toString();
    const age = getAge(birthdateString);
    const isMature = age >= 18;

    const novels = await this.novelsService.getPublicNovels();

    if (isMature) {
      return novels;
    }

    return novels.filter((novel) => !novel.isMature);
  }
}