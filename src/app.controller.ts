import { Controller, Get, Param } from '@nestjs/common';
import { Novel } from '@prisma/client';
import { AppService } from './app.service';
import { NovelService } from './novels/novels.service';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly novelService: NovelService,
  ) { }

  @Get('novel/:id')
  async getNovelById(@Param('id') id: string): Promise<Novel> {
    return this.novelService.novel({ id: Number(id) });
  }

  @Get('novels')
  async getAllNovels(): Promise<Array<Novel>> {
    return this.novelService.novels({});
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
