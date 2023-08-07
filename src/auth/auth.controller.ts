import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Public } from 'src/app.decorators';
import { Request } from 'src/types';
import { ChangePasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post("/register")
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto.email, registerDto.password);
    }

    @Public()
    @Post("/login")
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto.email, loginDto.password);
    }

    @Public()
    @Post("/resetPassword")
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        // return await this.authService.login(loginDto.email, loginDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/changePassword")
    async changePassword(@Req() request: Request, @Body() changePasswordDto: ChangePasswordDto) {
        const userId = request.jwt.user.id;
        const { oldPassword, password } = changePasswordDto;

        await this.authService.changePassword(userId, oldPassword, password);
    }
}
