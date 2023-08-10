import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'src/types';
import { SetupAccountDto, UpdateUserProfileDto } from './users.dto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(
        private usersRepository: UsersRepository,
        private usersService: UsersService,
    ) { }

    @Get("/")
    async getAllUsers(@Req() req: Request): Promise<any> {
        return this.usersRepository.users({});
    }

    @Get("/getUserProfile")
    async getUserProfile(@Req() request: Request) {
        const userId = request.jwt.user.id;
        const user = await this.usersRepository.user({ id: userId });
        const { password, salt, ...response } = user;
        return response;
    }

    @Post("/me/setupAccount")
    async setupAccount(@Req() request: Request, @Body() setupAccountDto: SetupAccountDto) {
        const userId = request.jwt.user.id;
        return await this.usersService.setupAccount(userId, setupAccountDto);
    }

    @Post("/me/updateUserProfile")
    async updateUserProfile(@Req() request: Request, @Body() updateUserProfileDto: UpdateUserProfileDto) {
        const userId = request.jwt.user.id;
        const user = await this.usersRepository.updateUser({ where: { id: userId }, data: updateUserProfileDto });
        const { password, salt, ...response } = user;

        return { user: response };
    }
}
