import { User } from "../entitie/user";

export class UserResponseDto{

    id: number;

    name: string;

    email: string;

    constructor(init?:Partial<User>){
        if(init){
            this.id = init.id;
            this.name = init.name;
            this.email = init.email;
        }
    }
}