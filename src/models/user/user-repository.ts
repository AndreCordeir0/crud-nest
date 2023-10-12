import { Injectable } from '@nestjs/common';
import { User } from "src/models/user/entitie/user";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User>{
    
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findByEmail(email:string):Promise<User>{
        return this.dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.roles", "roles")
        .where("user.email = :email", {email})
        .printSql()
        .getOne();
    }
    
}