import { Injectable } from "@nestjs/common";
import { Library, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class LibraryRepository {
  constructor(private prisma: PrismaService) {}
  async library(
    libraryWhereUniqueInput: Prisma.LibraryWhereUniqueInput,
  ): Promise<Library | null> {
    return this.prisma.library.findUnique({
      where: libraryWhereUniqueInput,
      include: {
        novels: {
          where: {
            status: "PUBLISHED",
          },

          include: {
            chapters: {
              where: {
                status: "PUBLISHED",
              },
            },
          },
        },
      },
    });
  }

  async libraries(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LibraryWhereUniqueInput;
    where?: Prisma.LibraryWhereInput;
    orderBy?: Prisma.LibraryOrderByWithRelationInput;
  }): Promise<Library[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.library.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        novels: {
          where: {
            status: "PUBLISHED",
          },
        },
      },
    });
  }

  async createLibrary(data: Prisma.LibraryCreateInput): Promise<Library> {
    return this.prisma.library.create({
      data,
    });
  }

  async updateLibrary(params: {
    where: Prisma.LibraryWhereUniqueInput;
    data: Prisma.LibraryUpdateInput;
  }): Promise<Library> {
    const { data, where } = params;
    return this.prisma.library.update({
      data,
      where,
    });
  }

  async deleteLibrary(where: Prisma.LibraryWhereUniqueInput): Promise<Library> {
    return this.prisma.library.delete({
      where,
    });
  }
}
