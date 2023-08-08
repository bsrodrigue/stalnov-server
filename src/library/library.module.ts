import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [LibraryService, PrismaService],
  exports: [LibraryService]
})
export class LibraryModule { }
