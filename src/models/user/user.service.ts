import { AuthService } from './../auth/auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { HashUtils } from 'src/common/utils/hash-utils';
import { UserDto } from 'src/models/user/dtos/user-dto';
import { User } from 'src/models/user/entitie/user';
import { UserRepository } from 'src/models/user/user-repository';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../roles/entitie/role';
import { UserRolesEnum } from '../user_roles/user-roles.enum';

@Injectable()
export class UserService {

    constructor(
        //Por algum motivo não se pode usar o @InjectRepository em uma DAO personalizada
        private userRepository:UserRepository,
        private authService:AuthService,
        @InjectRepository(Role)private roleRepository:Repository<Role>,
        @InjectDataSource() private dataSource: DataSource
    ){}
    async getByEmail(email:string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }


    async create(userDto:UserDto): Promise<string> {
        if(!userDto || userDto.id){
            throw new HttpException('invalid user', HttpStatus.BAD_REQUEST);
        }
        const user = await this.getByEmail(userDto.email);
        if(user){
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        userDto.password = HashUtils.hashPassword(userDto.password);
        //Transação necessaria para não haver inconsistencia de dados
        await this.dataSource.transaction(async () => {
            const user = new User(userDto);
            const role = await this.roleRepository.findOneBy({id:UserRolesEnum.USER.id});
            user.roles = [role];
            await this.userRepository.save(user);
            userDto = new UserDto(user);
            return userDto;
        });
        console.log(userDto);
        
        return await this.authService.generateToken(userDto);
    }

    /**
     * Deleta o usuario especificado se o usuario da requisição
     * tiver mais permição que o usuario a ser deletado {@see UserRolesEnum}
     * @param id id do user a ser removido
     * @param userReq usuario que fez a requisição
     * @returns
     */
    async remove(id:number, userReq:User): Promise<string> {
        const userDel:User = await this.userRepository.findOneBy({id:id});
        if(!userDel){
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }

        //Usuario a ser deletado
        const userDelRoleId = userDel?.roles[0]?.id;
        const userDelRole = UserRolesEnum.findEnum(userDelRoleId);

        //Usuario que fez a requisição
        const userReqRoleId = userReq?.roles[0]?.id;
        const userReqRole = UserRolesEnum.findEnum(userReqRoleId);

        if(userReqRole.rolesPermissions.includes(userDelRole)){
            await this.userRepository.remove(userDel);
            return 'user has been removed';
        }else{
            throw new HttpException('user not authorized', HttpStatus.FORBIDDEN);
        }
    }
}
