import { Injectable } from "@nestjs/common";
import { ReadsRepository } from "./reads.repository";

@Injectable()
export class ReadsService {
  constructor(
    private readsRepository: ReadsRepository,
  ) {}

  async read(userId: number, chapterId: number) {
    const reads = await this.readsRepository.reads({
      where: { ownerId: userId, chapterId },
    });

    if (reads.length) return false;

    await this.readsRepository.createRead({
      owner: { connect: { id: userId } },
      chapter: { connect: { id: chapterId } },
    });

    return true;
  }
}
