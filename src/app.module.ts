import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NovelsModule } from './novels/novels.module';
import { ConfigModule } from '@nestjs/config';
import { NovelService } from './novels/novels.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule.forRoot(), NovelsModule],
  controllers: [AppController],
  providers: [PrismaService, UserService, AppService, NovelService],
})
export class AppModule { }
