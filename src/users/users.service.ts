import { Injectable } from "@nestjs/common";
import { Gender, NovelGenre } from "@prisma/client";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) { }

    async setupAccount(userId: number, accountInformations: {
        firstName: string;
        lastName: string;
        username: string;
        gender: Gender;
        avatarUrl?: string;
        favouriteGenres?: Array<NovelGenre>;
        birthdate?: Date;
        bio?: string;

    }): Promise<any> {
        const user = await this.usersRepository.updateUser({
            where: { id: userId }, data: {
                isAccountSetup: true,
                library: {
                    create: {}
                },
                ...accountInformations
            }
        });
        const { password, salt, ...rest } = user;

        return { user: rest };
    }
}