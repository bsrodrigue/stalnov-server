import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/app.decorators';

@Controller('api/auth')
@Public()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/register")
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto.email, registerDto.password);
    }

    @Post("/login")
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto.email, loginDto.password);
    }
}
