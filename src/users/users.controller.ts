import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'src/types';

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get("/")
    async getAllUsers(@Req() req: Request): Promise<any> {
        return this.usersService.users({});
    }
}
