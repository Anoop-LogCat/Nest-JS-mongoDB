import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin007@core.u9v4l.mongodb.net/database?retryWrites=true&w=majority')
  ]
})
export class AppModule {}
