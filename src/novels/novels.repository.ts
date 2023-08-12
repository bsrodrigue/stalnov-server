import { Injectable } from "@nestjs/common";
import { Novel, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NovelsRepository {
  constructor(private prisma: PrismaService) {}
  async novel(
    novelWhereUniqueInput: Prisma.NovelWhereUniqueInput,
  ): Promise<Novel | null> {
    return this.prisma.novel.findUnique({
      where: novelWhereUniqueInput,
    });
  }

  async novels(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NovelWhereUniqueInput;
    where?: Prisma.NovelWhereInput;
    orderBy?: Prisma.NovelOrderByWithRelationInput;
  }): Promise<Novel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.novel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        owner: true,
        chapters: true,
      }
    });
  }

  async createNovel(data: Prisma.NovelCreateInput): Promise<Novel> {
    return this.prisma.novel.create({
      data,
      include: {
        owner: true,
        chapters: true,
      },
    });
  }

  async updateNovel(params: {
    where: Prisma.NovelWhereUniqueInput;
    data: Prisma.NovelUpdateInput;
  }): Promise<Novel> {
    const { data, where } = params;
    return this.prisma.novel.update({
      data,
      where,
      include: {
        owner: true,
        chapters: true,
      }
    });
  }

  async deleteNovel(where: Prisma.NovelWhereUniqueInput): Promise<Novel> {
    return this.prisma.novel.delete({
      where,
    });
  }
}
