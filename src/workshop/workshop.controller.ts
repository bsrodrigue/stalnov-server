import { Controller, Get, Req } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { Request } from 'src/types';

@Controller('workshop')
export class WorkshopController {
    constructor(
        private workshopService: WorkshopService,
    ) { }

    @Get("/novels")
    async getAllNovels(@Req() req: Request) {
        const userId = req.jwt.user.id;
        return await this.workshopService.getUserNovels(userId);
    }
}
