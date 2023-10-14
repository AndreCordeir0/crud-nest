import { Body, Controller, Post, ValidationPipe, Delete, Req, Param, Put, Get } from '@nestjs/common';
import { UserDto } from './dtos/user-dto';
import { UserService } from './user.service';
import { Public } from 'src/decorators/public-decorator';
import { Request } from 'express';
import { Admin } from 'src/decorators/admin-decorator';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Public()
    @Post()
    async createUser(@Body(new ValidationPipe({transform: true})) user:UserDto):Promise<string>{
        return await this.userService.create(user);
    }
    
    @Admin()
    @Get('get-all')
    async getAll(){
        return await this.userService.getAll();
    }

    @Admin()
    @Delete('delete/:id')
    async findAll(@Req() request: Request, @Param("id") id:number){
        return await this.userService.remove(id, request['user']);
    }

    @Put()
    async update(@Req() request: Request, @Body(new ValidationPipe({transform: true})) user:UserDto):Promise<string>{
        return await this.userService.update(user,request['user']);
    }

    @Post('create-with-role')
    async createUserWithRole(@Req() request: Request,@Body(new ValidationPipe({transform: true})) user:UserDto):Promise<string>{
        return await this.userService.createUserWithRole(user, new UserDto(request['user']));
    }
}
