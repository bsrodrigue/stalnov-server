import { Module } from "@nestjs/common";
import { LikesRepository } from "./likes.repository";
import { LikesController } from "./likes.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  exports: [LikesRepository],
  providers: [PrismaService, LikesRepository],
  controllers: [LikesController],
  imports: [],
})
export class LikesModule {}
