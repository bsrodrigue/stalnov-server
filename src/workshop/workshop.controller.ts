import { Controller, Get, Post, Req } from "@nestjs/common";
import { WorkshopService } from "./workshop.service";
import { Request } from "src/types";
import {
  CreateChapterDto,
  CreateNovelDto,
  UpdateChapterDto,
  UpdateNovelDto,
} from "./workshop.dto";

@Controller("api/workshop")
export class WorkshopController {
  constructor(
    private workshopService: WorkshopService,
  ) {}

  @Get("/novels")
  async getAllNovels(@Req() req: Request) {
    const userId = req.jwt.user.id;
    return await this.workshopService.getUserNovels(userId);
  }

  @Post("/createNovel")
  async createNovel(
    @Req() { jwt: { user: { id } } }: Request,
    dto: CreateNovelDto,
  ) {
    const payload = dto;
    return await this.workshopService.createNovel(id, payload);
  }

  @Post("/updateNovel")
  async updateNovel(
    @Req() { jwt: { user: { id } } }: Request,
    dto: UpdateNovelDto,
  ) {
    const { novelId, ...payload } = dto;
    return await this.workshopService.updateNovel(id, novelId, payload);
  }

  @Post("/createChapter")
  async createChapter(
    @Req() { jwt: { user: { id } } }: Request,
    dto: CreateChapterDto,
  ) {
    const { novelId, ...payload } = dto;
    return await this.workshopService.createChapter(id, novelId, payload);
  }

  @Post("/updateChapter")
  async updateChapter(
    @Req() { jwt: { user: { id } } }: Request,
    dto: UpdateChapterDto,
  ) {
    const { chapterId, ...payload } = dto;
    return await this.workshopService.updateChapter(id, chapterId, payload);
  }
}