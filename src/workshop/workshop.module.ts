import { Module } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { NovelsModule } from 'src/novels/novels.module';
import { WorkshopController } from './workshop.controller';
import { ChaptersModule } from 'src/chapters/chapters.module';

@Module({
  imports: [NovelsModule, ChaptersModule],
  providers: [WorkshopService],
  exports: [WorkshopService],
  controllers: [WorkshopController]
})
export class WorkshopModule { }
