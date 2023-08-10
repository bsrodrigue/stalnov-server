import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
    providers: [PrismaService, UsersRepository, UsersService],
    exports: [PrismaService, UsersRepository, UsersService],
    controllers: [UsersController]
})
export class UsersModule { }
