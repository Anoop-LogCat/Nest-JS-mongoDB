import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'usersCollection', schema: UserSchema }])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
