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
        return { userId: payload.sub, username: payload.username };
    }
}