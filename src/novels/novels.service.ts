import { Injectable } from "@nestjs/common";
import { NovelsRepository } from "./novels.repository";

@Injectable()
export class NovelsService {
  constructor(
    private novelsRepository: NovelsRepository,
  ) {}

  async getPublicNovels(pageSize?: number, cursor?: number) {
    const novels = await this.novelsRepository.novels({
      where: {
        status: "PUBLISHED",
        chapters: { every: { status: "PUBLISHED" } },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: pageSize,
      cursor: cursor
        ? {
          id: cursor,
        }
        : undefined,
      skip: cursor ? 1 : 0,
    });

    return novels;
  }

  async getPublicAuthorNovels(authorId: number) {
    const novels = await this.novelsRepository.novels({
      where: {
        ownerId: authorId,
        status: "PUBLISHED",
        chapters: { every: { status: "PUBLISHED" } },
      },

      orderBy: {
        updatedAt: "desc",
      },
    });

    return novels;
  }

  async searchNovel(searchTerms: string) {
    const novels = await this.novelsRepository.novels({
      where: {
        title: {
          contains: searchTerms,
        },
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
