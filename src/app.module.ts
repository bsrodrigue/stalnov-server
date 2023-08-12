import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { NovelsModule } from "./novels/novels.module";
import { PrismaService } from "./prisma.service";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";
import { LibraryModule } from "./library/library.module";
import { WorkshopModule } from "./workshop/workshop.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    NovelsModule,
    AuthModule,
    UsersModule,
    LibraryModule,
    WorkshopModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService, UsersService],
})
export class AppModule {}
