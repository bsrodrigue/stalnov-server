import { Injectable } from "@nestjs/common";
import { Chapter, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ChaptersRepository {
  constructor(private prisma: PrismaService) {}
  async chapter(
    chapterWhereUniqueInput: Prisma.ChapterWhereUniqueInput,
  ): Promise<Chapter | null> {
    return this.prisma.chapter.findUnique({
      where: chapterWhereUniqueInput,
      include: {
        likes: true,
        comments: true,
      }
    });
  }

  async chapters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChapterWhereUniqueInput;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput;
  }): Promise<Chapter[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.chapter.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        likes: true,
        comments: true,
      }
    });
  }

  async createChapter(data: Prisma.ChapterCreateInput): Promise<Chapter> {
    return this.prisma.chapter.create({
      data,
      include: {
        likes: true,
        comments: true,
      }
    });
  }

  async updateChapter(params: {
    where: Prisma.ChapterWhereUniqueInput;
    data: Prisma.ChapterUpdateInput;
  }): Promise<Chapter> {
    const { data, where } = params;
    return this.prisma.chapter.update({
      data,
      where,
      include: {
        likes: true,
        comments: true,
      }
    });
  }

  async deleteChapter(where: Prisma.ChapterWhereUniqueInput): Promise<Chapter> {
    return this.prisma.chapter.delete({
      where,
    });
  }
}
