import { Injectable } from "@nestjs/common";
import { NovelsRepository } from "src/novels/novels.repository";
import { CreateChapterDto, CreateNovelDto } from "./workshop.dto";
import { ChaptersRepository } from "src/chapters/chapters.repository";

@Injectable()
export class WorkshopService {
  constructor(
    private novelsRepository: NovelsRepository,
    private chaptersRepository: ChaptersRepository,
  ) {}

  async getUserNovels(userId: number) {
    return this.novelsRepository.novels({ where: { ownerId: userId } });
  }

  async getPublicUserNovels(userId: number) {
    return this.novelsRepository.novels({
      where: { ownerId: userId, status: "PUBLISHED" },
    });
  }

  async createNovel(userId: number, input: CreateNovelDto) {
    const novel = await this.novelsRepository.createNovel({
      owner: {
        connect: { id: userId },
      },
      status: "DRAFT",
      ...input,
    });

    return novel;
  }

  async updateNovel(
    userId: number,
    novelId: number,
    input: Partial<CreateNovelDto>,
  ) {
    const novel = await this.novelsRepository.updateNovel({
      where: { id: novelId, ownerId: userId },
      data: { ...input },
    });

    return novel;
  }

  async createChapter(
    userId: number,
    novelId: number,
    input: Pick<CreateChapterDto, "title" | "body">,
  ) {
    const chapter = await this.chaptersRepository.createChapter({
      novel: {
        connect: {
          ownerId: userId,
          id: novelId,
        },
      },
      status: "DRAFT",
      ...input,
    });

    return chapter;
  }

  async updateChapter(
    userId: number,
    chapterId: number,
    input: Partial<CreateChapterDto>,
  ) {
    const chapter = await this.chaptersRepository.updateChapter({
      where: { id: chapterId, novel: { ownerId: userId } },
      data: { ...input },
    });

    return chapter;
  }
}
