import { Injectable } from "@nestjs/common";
import { Read, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ReadsRepository {
  constructor(private prisma: PrismaService) {}
  async read(
    readWhereUniqueInput: Prisma.ReadWhereUniqueInput,
  ): Promise<Read | null> {
    return this.prisma.read.findUnique({
      where: readWhereUniqueInput,
    });
  }

  async reads(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReadWhereUniqueInput;
    where?: Prisma.ReadWhereInput;
    orderBy?: Prisma.ReadOrderByWithRelationInput;
  }): Promise<Read[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.read.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRead(data: Prisma.ReadCreateInput): Promise<Read> {
    return this.prisma.read.create({
      data,
    });
  }

  async updateRead(params: {
    where: Prisma.ReadWhereUniqueInput;
    data: Prisma.ReadUpdateInput;
  }): Promise<Read> {
    const { data, where } = params;
    return this.prisma.read.update({
      data,
      where,
    });
  }

  async deleteRead(where: Prisma.ReadWhereUniqueInput): Promise<Read> {
    return this.prisma.read.delete({
      where,
    });
  }
}
