import { Injectable } from '@nestjs/common';
import { NovelsRepository } from 'src/novels/novels.repository';

@Injectable()
export class WorkshopService {
    constructor(
        private novelsRepository: NovelsRepository,
    ) { }

    async getUserNovels(userId: number) {
        return this.novelsRepository.novels({ where: { ownerId: userId } });
    }

    async getPublicUserNovels(userId: number) {
        return this.novelsRepository.novels({ where: { ownerId: userId, status: "PUBLISHED" } });
    }
}
