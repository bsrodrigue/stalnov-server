import { Module } from '@nestjs/common';
import { NovelsRepository } from './novels.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NovelsRepository, PrismaService],
  exports: [NovelsRepository]
})
export class NovelsModule { }
