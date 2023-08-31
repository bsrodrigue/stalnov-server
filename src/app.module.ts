import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { NovelsModule } from "./novels/novels.module";
import { PrismaService } from "./prisma.service";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";
import { LibraryModule } from "./library/library.module";
import { WorkshopModule } from "./workshop/workshop.module";
import { LikesModule } from "./likes/likes.module";
import { ReadsModule } from "./reads/reads.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    NovelsModule,
    AuthModule,
    UsersModule,
    LibraryModule,
    WorkshopModule,
    LikesModule,
    ReadsModule,
  ],
  controllers: [],
  providers: [PrismaService, UsersService],
})
export class AppModule {}
