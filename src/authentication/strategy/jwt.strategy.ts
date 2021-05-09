import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { keys } from './keys.constants'


export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: keys.jwtKey,
        });
    }

    async validate(payload: any) {
        return {
            uid: payload._id,
            username: payload.username,
            email: payload.email,
            phone: payload.phone,
            profileImage: payload.profileImage
        };
    }
}