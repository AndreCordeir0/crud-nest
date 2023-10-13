import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { HttpUtils } from 'src/common/utils/http-utils';
import { IS_PUBLIC_KEY } from 'src/decorators/public-decorator';
import { jwtConstants } from './constant';
import { IS_ADMIN_KEY } from 'src/decorators/admin-decorator';
import { UserRolesEnum } from '../user_roles/user-roles.enum';
@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService:JwtService, private reflector: Reflector){
    }

    async canActivate(context: ExecutionContext):Promise<boolean>{
        if (this.hasDecorator(context, IS_PUBLIC_KEY)) {
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
            if (this.hasDecorator(context, IS_ADMIN_KEY)) {
                if(payload.roles[0].id == UserRolesEnum.USER){
                    throw new UnauthorizedException('invalid token');
                }
            }
            request['user'] = payload;
        }catch(err){
            throw new UnauthorizedException('invalid token');
        }
        return true;
    }

    hasDecorator(context: ExecutionContext, token: string): boolean{
        const hasToken = this.reflector.getAllAndOverride<boolean>(token, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (hasToken) {
            return true;
        }
    }
}

    