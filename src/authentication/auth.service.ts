import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) { }

    async validateUser(usernameParams: string, passwordParams: string): Promise<any> {
        const user: UserDocument = await this.usersService.findOne(usernameParams);
        if (user && user.password === passwordParams) {
            return user;
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
