import { Module } from "@nestjs/common";
import { LibraryService } from "./library.service";
import { PrismaService } from "src/prisma.service";
import { NovelsModule } from "src/novels/novels.module";

@Module({
  imports: [NovelsModule],
  providers: [LibraryService, PrismaService],
  exports: [LibraryService],
})
export class LibraryModule {}
