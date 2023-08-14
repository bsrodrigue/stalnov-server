import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "src/types";
import { LikeChapterDto } from "./likes.dto";
import { LikesRepository } from "./likes.repository";

@Controller("api/likes")
export class LikesController {
  constructor(
    private likesRepository: LikesRepository,
  ) {}

  @Post("/like")
  async likeChapter(
    @Req() { jwt: { user: { id } } }: Request,
    @Body() likeChapterDto: LikeChapterDto,
  ) {
    const { chapterId } = likeChapterDto;

    const exists = await this.likesRepository.likes({
      where: { ownerId: id, chapterId },
    });

    if (exists.length) {
      throw new UnauthorizedException("cannot-like-same-chapter-again");
    }

    await this.likesRepository.createLike({
      owner: { connect: { id } },
      chapter: { connect: { id: chapterId } },
    });
  }

  @Post("/unlike")
  async unlikeChapter(
    @Req() { jwt: { user: { id } } }: Request,
    @Body() likeChapterDto: LikeChapterDto,
  ) {
    const { chapterId } = likeChapterDto;

    const exists = await this.likesRepository.likes({
      where: { ownerId: id, chapterId },
    });

    if (!exists) {
      throw new UnauthorizedException("chapter-was-never-liked");
    }

    await this.likesRepository.deleteLike({id: exists[0].id});
  }
}
