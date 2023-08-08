import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LibraryModule } from 'src/library/library.module';

@Module({
  imports: [
    UsersModule,
    LibraryModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),

  ],
  providers: [{
    provide: "APP_GUARD",
    useClass: AuthGuard
  }, AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
