import { AuthModule } from './authentication/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('provide mongo db url')
  ],
  exports: [AuthModule]
})
export class AppModule { }
