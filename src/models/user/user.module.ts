import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/entitie/user';
import { UserRepository } from 'src/models/user/user-repository';
import { UserService } from 'src/models/user/user.service';
import { Role } from '../roles/entitie/role';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [UserService,UserRepository],
    exports:[UserService],
    controllers: [UserController]
})
export class UserModule {}
