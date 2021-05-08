import { Body, Delete, Get, Patch, Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserModel } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private service:UserService){}

    @Post()
    async userCreation(@Body() user:any){
        return await this.service.userCreation(user as UserModel)
    }

    @Patch(':id')
    async updateUserInfo(@Param('id') id:string,@Body() updateParams:any){
        return await this.service.updateUserInfo(updateParams,id)
    }

    @Get()
    async getUsers(){
        const allUsers = await this.service.getUsers()
        return allUsers
    }

    @Get(':id')
    async getOneUser(@Param('id') id:string){
        const User = await this.service.getOneUser(id)
        return User
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:string){
        return await (this.service.deleteUser(id))
    }
}
