import { Injectable } from "@nestjs/common";
import { NovelsRepository } from "./novels.repository";

@Injectable()
export class NovelsService {
  constructor(
    private novelsRepository: NovelsRepository,
  ) {}

  async getPublicNovels() {
    const novels = await this.novelsRepository.novels({
      where: {
        status: "PUBLISHED",
        chapters: { every: { status: "PUBLISHED" } },
      },

      orderBy: {
        updatedAt: "desc",
      },
    });

    return novels;
  }
}
