import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Gender, NovelGenre } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { LibraryService } from 'src/library/library.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private libraryService: LibraryService,
    ) { }

    async register(email: string, password: string): Promise<any> {
        const user = await this.usersService.createUser({ email, password, isAccountSetup: false, role: "USER" });
        const { password: userPassword, salt, ...rest } = user;
        const payload = { user: rest };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async login(email: string, password: string): Promise<any> {
        const user = await this.usersService.user({ email });
        if (!user) throw new NotFoundException("user-not-found");
        const matches = await bcrypt.compare(password, user.password);
        if (!matches) throw new UnauthorizedException("incorrect-password");
        const { password: userPassword, salt, ...rest } = user;
        const payload = { user: rest };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async createSuperuser(email: string, password: string): Promise<any> {
        const user = await this.usersService.createUser({ email, password, isAccountSetup: false, role: 'ADMIN' });
        const { password: userPassword, ...rest } = user;
        const payload = { user: rest };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async changePassword(userId: number, oldPassword: string, password: string): Promise<any> {
        const user = await this.usersService.user({ id: userId })
        if (!user) throw new NotFoundException("user-not-found");
        const matches = await bcrypt.compare(oldPassword, user.password);
        if (!matches) throw new UnauthorizedException("incorrect-password");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await this.usersService.updateUser({ where: { id: userId }, data: { password: hash } })
    }

    async changeEmail(userId: number, email: string, password): Promise<any> {
        const user = await this.usersService.user({ id: userId })
        if (!user) throw new NotFoundException("user-not-found");
        const matches = await bcrypt.compare(password, user.password);
        if (!matches) throw new UnauthorizedException("incorrect-password");

        if (email === user.email) throw new BadRequestException("cannot-use-previous-email");

        await this.usersService.updateUser({ where: { id: userId }, data: { email } });
    }

    async deleteAccount(userId: number, password): Promise<any> {
        const user = await this.usersService.user({ id: userId })
        if (!user) throw new NotFoundException("user-not-found");
        const matches = await bcrypt.compare(password, user.password);
        if (!matches) throw new UnauthorizedException("incorrect-password");

        await this.usersService.deleteUser({ id: userId });
    }

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
        const user = await this.usersService.updateUser({
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
