import * as mongoose from 'mongoose';

export type UserDocument = UserModel & mongoose.Document;

export interface UserModel {
    username: string,
    email: string,
    password: string,
    phone: number,
    profileImage: string
}

export const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: Number,
    profileImage: String
});