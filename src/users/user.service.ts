import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const existEmail = await this.findOneByEmail(userDto.email);
    if (existEmail) {
      throw new ConflictException(`Already exists this email`);
    }
    const { password, salt } = this.securityHash(userDto.password);
    const createdUser = new this.userModel({
      ...userDto,
      password,
      salt,
    });
    const user = await createdUser.save();
    const newUser: UserDocument = user.toObject();
    delete newUser.password;
    delete newUser.salt;

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0, salt: 0 }).exec();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const { password, salt } = this.securityHash(updateUserDto.password);
      updateUserDto.password = password;
      updateUserDto['salt'] = salt;
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  private securityHash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return { password: hashedPassword, salt };
  }
}
