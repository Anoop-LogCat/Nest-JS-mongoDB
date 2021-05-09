import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './user.schema';
import { HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('usersCollection') private readonly mongoUserModel: Model<UserDocument>) { }

    async userCreation(user: UserModel) {
        let result: UserDocument;
        try {
            result = new this.mongoUserModel({
                username: user.username,
                email: user.email,
                password: user.password,
                phone: user.phone,
                profileImage: user.profileImage
            })
            return "New User added with ID : " + (await result.save())._id
        } catch (e) {
            throw new HttpException('Insertion failed', HttpStatus.FORBIDDEN)
        }
    }

    async updateUserInfo(user: any, uid: string) {
        try { await this.mongoUserModel.updateOne({ _id: uid }, (user)).exec() }
        catch (e) { throw new HttpException('Update failed', HttpStatus.FORBIDDEN) }
        return "User data updated with ID :" + uid
    }

    async getUsers() {
        const temp = (await this.mongoUserModel.find().exec()) as UserModel[]
        if (temp.length == 0) throw new HttpException("No user present", HttpStatus.FORBIDDEN)
        else return temp
    }

    async getOneUser(id: string) {
        try { return (await this.mongoUserModel.findById(id).exec()) as UserModel }
        catch (e) { throw new HttpException('no user in this id', HttpStatus.FORBIDDEN) }
    }

    async findOne(username: string) {
        try { return (await this.mongoUserModel.findOne({ username: username }).exec()) }
        catch (e) { throw new HttpException('no user in this id', HttpStatus.FORBIDDEN) }
    }

    async deleteUser(id: string) {
        const deleteResponse = await this.mongoUserModel.deleteOne({ _id: id }).exec()
        if (deleteResponse.deletedCount === 0) {
            throw new HttpException("deletion failed check the ID provided", HttpStatus.FORBIDDEN)
        }
        return "deleted successfully"
    }
}
