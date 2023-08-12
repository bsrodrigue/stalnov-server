import { Module } from "@nestjs/common";
import { ChaptersRepository } from "./chapters.repository";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [ChaptersRepository, PrismaService],
  exports: [ChaptersRepository],
})
export class ChaptersModule {
}
