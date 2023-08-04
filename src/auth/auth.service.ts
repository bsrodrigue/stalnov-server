import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(email: string, password: string): Promise<any> {
        const user = await this.usersService.createUser({ email, password, isAccountSetup: false });
        const { password: userPassword, ...rest } = user;
        const payload = { user: rest };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
