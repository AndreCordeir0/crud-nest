import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashUtils } from 'src/common/utils/hash-utils';
import { User } from '../user/entitie/user';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService) {
        
    }
    /**
     * Retorna a senha se a senha for valida
     * @param user recebe o usuário recuperado da base
     * @param password recebe a senha digitado pelo usuário
     * @returns retorna o token JWT
     */
    async singIn(user:User, password:string):Promise<any>{
        if(!user || !password){
            throw new HttpException('invalid credentials', 401);
        }
        const result = await HashUtils.comparePassword(password, user.password);
        if(!result){
            throw new HttpException('invalid credentials', 401);
        }

        return await this.generateToken(user);
    }

    async generateToken(user:User):Promise<any>{
        const payload = {id:user.id, userName: user.name,roles:user.roles};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
