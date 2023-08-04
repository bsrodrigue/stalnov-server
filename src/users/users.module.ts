import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';

@Module({
    providers: [PrismaService, UsersService],
    exports: [PrismaService, UsersService]
})
export class UsersModule { }
