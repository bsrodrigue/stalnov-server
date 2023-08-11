import { Module } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { NovelsModule } from 'src/novels/novels.module';
import { WorkshopController } from './workshop.controller';

@Module({
  imports: [NovelsModule],
  providers: [WorkshopService],
  exports: [WorkshopService],
  controllers: [WorkshopController]
})
export class WorkshopModule { }
