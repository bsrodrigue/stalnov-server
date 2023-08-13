import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { NovelsService } from "./novels.service";
import { Request } from "src/types";
import { SearchDto } from "./novels.dto";

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

  @Get("/author/:id")
  async getAuthorNovels(@Req() req: Request) {
    const authorId = parseInt(req.params.id);
    const birthdate = req.jwt.user.birthdate;
    const birthdateString = new Date(birthdate).toString();
    const age = getAge(birthdateString);
    const isMature = age >= 18;

    const novels = await this.novelsService.getPublicAuthorNovels(authorId);

    if (isMature) {
      return novels;
    }

    return novels.filter((novel) => !novel.isMature);
  }

  @Post("/search")
  async searchNovel(
    @Req() req: Request,
    @Body() dto: SearchDto,
  ) {
    const { searchTerms } = dto;
    const birthdate = req.jwt.user.birthdate;
    const birthdateString = new Date(birthdate).toString();
    const age = getAge(birthdateString);
    const isMature = age >= 18;

    console.log(searchTerms);

    const novels = await this.novelsService.searchNovel(searchTerms);

    if (isMature) {
      return novels;
    }

    return novels.filter((novel) => !novel.isMature);
  }
}
