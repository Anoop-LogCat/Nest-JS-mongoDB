import * as mongoose from 'mongoose';

export type UserDocument = UserModel & mongoose.Document;

export interface UserModel{
    id?:string,
    username?:string,
    email?:string,
    password?:string,
    phone?:number,
    profileImage?:string
}

export const UserSchema = new mongoose.Schema({
    id:String,
    username:String,
    email:String,
    password:String,
    phone:Number,
    profileImage:String
  });