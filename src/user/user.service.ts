import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './user.schema';
import { HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as hashing from 'bcrypt'
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(@InjectModel('usersCollection') private readonly mongoUserModel: Model<UserDocument>) { }


    googleService(req: any) {
        if (!req.user) {
            throw new HttpException("invalid credentials", HttpStatus.FORBIDDEN)
        }
        else {
            return req.user
        }
    }

    async userCreation(user: UserModel) {
        let result: UserDocument;
        const hashedPassword = await hashing.hash(user.password, 10)
        try {
            result = new this.mongoUserModel({
                username: user.username,
                email: user.email,
                password: hashedPassword,
                phone: user.phone,
                profileImage: user.profileImage
            })
            return "New User added with ID : " + (await result.save())._id
        } catch (e) {
            throw new HttpException('Insertion failed', HttpStatus.FORBIDDEN)
        }
    }

    async updateUserInfo(updateParams: any, uid: string) {
        if (updateParams.password) {
            updateParams.password = await hashing.hash(updateParams.password, 10)
        }
        else if (updateParams._id) {
            throw new HttpException("You cant change the id of document", HttpStatus.FORBIDDEN)
        }
        try { await this.mongoUserModel.updateOne({ _id: uid }, (updateParams)).exec() }
        catch (e) { throw new HttpException('Update failed', HttpStatus.FORBIDDEN) }
        return "User data updated with ID :" + uid
    }

    async getUsers() {
        const temp = await this.mongoUserModel.find().exec()
        if (temp.length == 0) throw new HttpException("No user present", HttpStatus.FORBIDDEN)
        else return temp
    }

    async getOneUser(id: string) {
        try { return await this.mongoUserModel.findById(id).exec() }
        catch (e) { throw new HttpException('no user in this id', HttpStatus.FORBIDDEN) }
    }

    async findOne(username: string) {
        return await this.mongoUserModel.findOne({ username: username }).exec()
    }

    async deleteUser(id: string) {
        const deleteResponse = await this.mongoUserModel.deleteOne({ _id: id }).exec()
        if (deleteResponse.deletedCount === 0) {
            throw new HttpException("deletion failed check the ID provided", HttpStatus.FORBIDDEN)
        }
        return "deleted successfully"
    }
}
