import { PassportStrategy } from "@nestjs/passport";
import { VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { Strategy } from "passport-google-oauth20";
import { keys } from "./keys.constants";

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "http://localhost:3000/user/google/callback/response",
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            firstName: name.givenName,
            lastName: name.familyName,
            email: emails[0].value,
            profileImage: photos[0].value,
        }
        done(null, user)
    }
}