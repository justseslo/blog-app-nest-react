import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.userModel.create(createUserDto);
  }
  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }
}
