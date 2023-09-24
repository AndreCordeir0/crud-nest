import { Body, Controller, Post, ValidationPipe, Delete, Req, Param, Put } from '@nestjs/common';
import { UserDto } from './dtos/user-dto';
import { UserService } from './user.service';
import { Public } from 'src/decorators/public-decorator';
import { Request } from 'express';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Public()
    @Post()
    async createUser(@Body(new ValidationPipe({transform: true})) user:UserDto):Promise<string>{
        return await this.userService.create(user);
    }

    @Delete('delete/:id')
    async findAll(@Req() request: Request, @Param("id") id:number){
        return await this.userService.remove(id, request['user']);
    }

    @Put()
    async update(@Body(new ValidationPipe({transform: true})) user:UserDto):Promise<string>{
        return null;
    }
}
