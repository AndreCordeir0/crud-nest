import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/entitie/user';
import { UserRepository } from 'src/models/user/user-repository';
import { UserService } from 'src/models/user/user.service';
import { AuthModule } from '../auth/auth.module';
import { Role } from '../roles/entitie/role';
import { UserController } from './user.controller';

@Module({
    // Necessario utilizar o forwardRef() para resolver Circular dependency
    // ex: UserModule -> AuthModule -> UserModule 
    // https://docs.nestjs.com/fundamentals/circular-dependency
    imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([User, Role])],
    providers: [UserService,UserRepository],
    exports:[UserService],
    controllers: [UserController]
})
export class UserModule {}
