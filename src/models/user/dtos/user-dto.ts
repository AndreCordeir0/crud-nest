import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "../entitie/user";
import { RoleDto } from "src/models/roles/dtos/role-dto";

export class UserDto{

    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty() 
    password: string;

    @IsEmail()
    email: string;
  
    roles:RoleDto[];

    constructor(init?:Partial<User>){
      if(init){
        this.id = init.id;
        this.name = init.name;
        this.password = init.password;
        this.email = init.email;
        if(init?.roles?.length){
          this.roles = init.roles.map(role=>new RoleDto(role));
        }
      }
    }
}