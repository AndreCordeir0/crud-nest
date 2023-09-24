import { Injectable } from '@nestjs/common';
import { User } from "src/models/user/entitie/user";
import { DataSource, Repository } from "typeorm";
import { Role } from '../roles/entitie/role';

@Injectable()
export class UserRepository extends Repository<User>{
    
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findByEmail(email:string):Promise<User>{
        // const teste = await this.dataSource.query(`SELECT * FROM USER user LEFT JOIN USER_ROLES uroles on uroles.user_id = user.id WHERE user.email = ${email}`);
        // console.log(teste);
        return this.dataSource.getRepository(User).createQueryBuilder("user").leftJoinAndSelect("user.roles", "roles").where("user.email = :email", {email}).printSql().getOne();
    }
    
}