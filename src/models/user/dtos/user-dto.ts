import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto{

    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty() 
    password: string;

    @IsEmail()
    email: string;
  
    // isValidUser():boolean{
    //   return !!this.id && !!this.name && !!this.password && !!this.email;
    // }
    constructor(init?:Partial<UserDto>){
      Object.assign(this, init);
    }
}