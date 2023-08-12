import { Module } from "@nestjs/common";
import { NovelsRepository } from "./novels.repository";
import { PrismaService } from "src/prisma.service";
import { NovelsController } from "./novels.controller";
import { NovelsService } from "./novels.service";

@Module({
  providers: [NovelsRepository, NovelsService, PrismaService],
  controllers: [NovelsController],
  exports: [NovelsRepository, NovelsService],
})
export class NovelsModule {}
