import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleStrategy } from 'src/authentication/strategy/google.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'usersCollection', schema: UserSchema }])],
  providers: [UserService, GoogleStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
