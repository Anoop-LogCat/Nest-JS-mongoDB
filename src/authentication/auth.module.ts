import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { keys } from './strategy/keys.constants';
import { JwtAuthStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: keys.jwtKey,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtAuthStrategy]
})
export class AuthModule { }
