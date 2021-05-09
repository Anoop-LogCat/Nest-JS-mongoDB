import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from '../user/user.service';
import * as hashing from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) { }

    async validateUser(usernameParams: string, passwordParams: string): Promise<any> {
        const user = await this.usersService.findOne(usernameParams).catch(_ => { return null })
        if (user) {
            const isCorrectPass = await hashing.compare(passwordParams, user.password)
            if (isCorrectPass) { return user; }
        }
        return null;
    }

    async generateToken(user: UserDocument) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
