import { Injectable } from "@nestjs/common";
import { Like, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class LikesRepository {
  constructor(private prisma: PrismaService) {}
  async like(
    likeWhereUniqueInput: Prisma.LikeWhereUniqueInput,
  ): Promise<Like | null> {
    return this.prisma.like.findUnique({
      where: likeWhereUniqueInput,
    });
  }

  async likes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LikeWhereUniqueInput;
    where?: Prisma.LikeWhereInput;
    orderBy?: Prisma.LikeOrderByWithRelationInput;
  }): Promise<Like[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.like.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createLike(data: Prisma.LikeCreateInput): Promise<Like> {
    return this.prisma.like.create({
      data,
    });
  }

  async updateLike(params: {
    where: Prisma.LikeWhereUniqueInput;
    data: Prisma.LikeUpdateInput;
  }): Promise<Like> {
    const { data, where } = params;
    return this.prisma.like.update({
      data,
      where,
    });
  }

  async deleteLike(where: Prisma.LikeWhereUniqueInput): Promise<Like> {
    return this.prisma.like.delete({
      where,
    });
  }
}
