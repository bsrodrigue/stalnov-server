import { Module } from "@nestjs/common";
import { LibraryService } from "./library.service";
import { PrismaService } from "src/prisma.service";
import { NovelsModule } from "src/novels/novels.module";
import { LibraryController } from "./library.controller";
import { LibraryRepository } from "./library.repository";

@Module({
  imports: [NovelsModule],
  providers: [LibraryRepository, LibraryService, PrismaService],
  controllers: [LibraryController],
  exports: [LibraryService],
})
export class LibraryModule {}
