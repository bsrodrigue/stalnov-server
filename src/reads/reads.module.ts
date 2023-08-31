import { Module } from "@nestjs/common";
import { ReadsService } from "./reads.service";
import { ReadsController } from "./reads.controller";
import { ReadsRepository } from "./reads.repository";
import { PrismaService } from "src/prisma.service";

@Module(
  {
    providers: [ReadsRepository, ReadsService, PrismaService],
    controllers: [ReadsController],
  },
)
export class ReadsModule {}
