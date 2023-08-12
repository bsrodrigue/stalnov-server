import { Controller, Get, Param } from '@nestjs/common';
import { Novel } from '@prisma/client';
import { AppService } from './app.service';
import { NovelsRepository } from './novels/novels.repository';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly novelRepository: NovelsRepository,
  ) { }

  @Get('novel/:id')
  async getNovelById(@Param('id') id: string): Promise<Novel> {
    return this.novelRepository.novel({ id: Number(id) });
  }

  @Get('novels')
  async getAllNovels(): Promise<Array<Novel>> {
    return this.novelRepository.novels({});
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
