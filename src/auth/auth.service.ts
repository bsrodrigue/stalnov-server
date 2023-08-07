import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(email: string, password: string): Promise<any> {
        const user = await this.usersService.createUser({ email, password, isAccountSetup: false });
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
}
