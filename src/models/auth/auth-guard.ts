import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { HttpUtils } from 'src/common/utils/http-utils';
import { IS_PUBLIC_KEY } from 'src/decorators/public-decorator';
import { jwtConstants } from './constant';
@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService:JwtService, private reflector: Reflector){
    }

    async canActivate(context: ExecutionContext):Promise<boolean>{
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const token = HttpUtils.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException('invalid token');
        }
        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                  secret: jwtConstants.secret
                }
            )
            request['user'] = payload;
        }catch(err){
            throw new UnauthorizedException('invalid token');
        }
        return true;
    }
}