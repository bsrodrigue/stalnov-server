import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { LibraryService } from "./library.service";
import { Request } from "src/types";
import { LibraryDto } from "./library.dto";

@Controller("api/library")
export class LibraryController {
  constructor(
    private libraryService: LibraryService,
  ) {}

  @Get("/me")
  async getUserLibrary(@Req() { jwt: { user: { id } } }: Request) {
    return await this.libraryService.getUserLibrary(id);
  }

  @Post("/me/add")
  async addToLibrary(
    @Req() { jwt: { user: { id } } }: Request,
    @Body() dto: LibraryDto,
  ) {
    return await this.libraryService.addToLibrary(id, dto.novelId);
  }

  @Post("/me/remove")
  async removeFromLibrary(
    @Req() { jwt: { user: { id } } }: Request,
    @Body() dto: LibraryDto,
  ) {
    return await this.libraryService.removeFromLibrary(id, dto.novelId);
  }
}
