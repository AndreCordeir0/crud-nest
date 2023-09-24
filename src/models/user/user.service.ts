import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { HashUtils } from 'src/common/utils/hash-utils';
import { UserDto } from 'src/models/user/dtos/user-dto';
import { User } from 'src/models/user/entitie/user';
import { UserRepository } from 'src/models/user/user-repository';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../roles/entitie/role';
import { UserRolesEnum } from '../user_roles/user-roles.enum';
import { UserResponseDto } from './dtos/user-response-dto';

@Injectable()
export class UserService {

    constructor(
        private userRepository:UserRepository,
        @InjectRepository(Role)private roleRepository:Repository<Role>,
        @InjectDataSource() private dataSource: DataSource
    ){
    }
    async getByEmail(email:string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }


    async create(userDto:UserDto): Promise<string> {
        if(!userDto || userDto.id){
            throw new HttpException('invalid user', HttpStatus.BAD_REQUEST);
        }
        await this.userRepository.findByEmail(userDto.email).then((user) => {
            if(user){
                throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
            }
        });
        userDto.password = HashUtils.hashPassword(userDto.password);
        await this.dataSource.transaction(async () => {
            const user = new User(userDto);
            const role = await this.roleRepository.findOneBy({id:UserRolesEnum.USER.id});
            user.roles = [role];
            await this.userRepository.save(user);
   
        });


        return 'user created';
    }

    async remove(id:number, userReq:User): Promise<string> {
        const userDel:User = await this.userRepository.findOneBy({id:id});
        const userDelRoleId = userDel?.roles[0]?.id;
        const userDelRole = UserRolesEnum.findEnum(userDelRoleId);

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
