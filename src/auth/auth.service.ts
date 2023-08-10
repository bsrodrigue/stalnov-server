import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) { }

    async register(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.createUser({ email, password, isAccountSetup: false, role: "USER" });
        const { password: userPassword, salt, ...rest } = user;
        const payload = { user: rest };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async login(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.user({ email });
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
        const user = await this.usersRepository.createUser({ email, password, isAccountSetup: false, role: 'ADMIN' });
        const { password: userPassword, ...rest } = user;
        const payload = { user: rest };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async changePassword(userId: number, oldPassword: string, password: string): Promise<any> {
        const user = await this.usersRepository.user({ id: userId })
        if (!user) throw new NotFoundException("user-not-found");
        const matches = await bcrypt.compare(oldPassword, user.password);
        if (!matches) throw new UnauthorizedException("incorrect-password");

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        await this.usersRepository.updateUser({ where: { id: userId }, data: { password: hash } })
    }

    async changeEmail(userId: number, email: string, password): Promise<any> {
        const user = await this.usersRepository.user({ id: userId })
        if (!user) throw new NotFoundException("user-not-found");
        const matches = await bcrypt.compare(password, user.password);
        if (!matches) throw new UnauthorizedException("incorrect-password");

        if (email === user.email) throw new BadRequestException("cannot-use-previous-email");

        await this.usersRepository.updateUser({ where: { id: userId }, data: { email } });
    }

    async deleteAccount(userId: number, password): Promise<any> {
        const user = await this.usersRepository.user({ id: userId })
        if (!user) throw new NotFoundException("user-not-found");
        const matches = await bcrypt.compare(password, user.password);
        if (!matches) throw new UnauthorizedException("incorrect-password");

        await this.usersRepository.deleteUser({ id: userId });
    }


}
