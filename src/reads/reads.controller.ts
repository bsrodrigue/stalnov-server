import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "src/types";
import { ReadDto } from "./reads.dto";
import { ReadsService } from "./reads.service";

@Controller("api/reads")
export class ReadsController {
  constructor(
    private readsService: ReadsService,
  ) {}

  @Post("/read")
  async read(@Req() req: Request, @Body() dto: ReadDto) {
    const userId = req.jwt.user.id;
    const { chapterId } = dto;

    const result = await this.readsService.read(userId, chapterId);

    return {
      status: result ? "new_read" : "already",
    };
  }
}
