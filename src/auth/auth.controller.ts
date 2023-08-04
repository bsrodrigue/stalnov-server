import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/register")
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto.email, registerDto.password);
    }
}
