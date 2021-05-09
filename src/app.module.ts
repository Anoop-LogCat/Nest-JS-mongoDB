import { AuthModule } from './authentication/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb+srv://admin:anoop@007@core.u9v4l.mongodb.net/database?retryWrites=true&w=majority')
  ],
  exports: [AuthModule]
})
export class AppModule { }
