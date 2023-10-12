import { IsEmail, IsNotEmpty } from "class-validator";
import { RoleDto } from "src/models/roles/dtos/role-dto";
import { User } from "../entitie/user";

export class UserDto{

    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty() 
    password: string;

    @IsEmail()
    email: string;
  
    roles:RoleDto[];

    role: string;

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
    getRole(){
      if(this.roles?.length){
        return this.roles[0]
      }
      return null;
    }
}