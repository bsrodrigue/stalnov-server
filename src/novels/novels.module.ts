import { Module } from '@nestjs/common';
import { NovelService } from './novels.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NovelService, PrismaService]
})
export class NovelsModule { }
