import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LibraryService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async createLibrary(data: Prisma.LibraryCreateInput) {
        return this.prismaService.library.create({
            data
        });
    }
}
