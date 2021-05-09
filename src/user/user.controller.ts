import { Body, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserModel } from './user.schema';
import { UserService } from './user.service';
import { Request } from 'express'
import { LocalGuard } from 'src/authentication/guard/local.guard';
import { JwtGuard } from 'src/authentication/guard/jwt.guard';
import { GoogleGuard } from 'src/authentication/guard/google.guard';

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService) { }

    @Get('google')
    @UseGuards(GoogleGuard)
    async googleAuth(@Req() req: Request) {

    }

    @Get('google/callback/response')
    @UseGuards(GoogleGuard)
    async googleAuthCallBack(@Req() req: Request) {
        return this.service.googleService(req)
    }

    @Post('signUp')
    async userCreation(@Body() user: UserModel) {
        return await this.service.userCreation(user)
    }

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req: Request) {
        return req.user
    }

    @UseGuards(JwtGuard)
    @Post(':id')
    async updateUserInfo(@Param('id') id: string, @Body() updateParams: any) {
        return await this.service.updateUserInfo(updateParams, id)
    }

    @UseGuards(JwtGuard)
    @Get()
    async getUsers() {
        const allUsers = await this.service.getUsers()
        return allUsers
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getOneUser(@Param('id') id: string) {
        const User = await this.service.getOneUser(id)
        return User
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await (this.service.deleteUser(id))
    }
}
