import { Injectable } from "@nestjs/common";
import { LibraryRepository } from "./library.repository";

@Injectable()
export class LibraryService {
  constructor(
    private libraryRepository: LibraryRepository,
  ) {}

  async getUserLibrary(userId: number) {
    return await this.libraryRepository.library({
      ownerId: userId,
    });
  }

  async addToLibrary(userId: number, novelId: number) {
    await this.libraryRepository.updateLibrary({
      where: {
        ownerId: userId,
      },

      data: {
        novels: { connect: { id: novelId } },
      },
    });
  }

  async removeFromLibrary(userId: number, novelId: number) {
    await this.libraryRepository.updateLibrary({
      where: {
        ownerId: userId,
      },

      data: {
        novels: { disconnect: { id: novelId } },
      },
    });
  }
}
