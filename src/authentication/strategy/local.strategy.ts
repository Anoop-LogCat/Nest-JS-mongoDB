import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDocument } from 'src/user/user.schema';
import { AuthService } from '../auth.service';

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user: UserDocument = await this.authService.validateUser(username, password);
        if (!user) { throw new UnauthorizedException(); }
        const token = await this.authService.generateToken(user)
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            profileImage: user.profileImage,
            ...token
        };
    }
}
