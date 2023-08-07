import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./constants";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "src/app.decorators";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret
            })

            req['jwt'] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(req: Request): string | null {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }

}