import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Message, MessageDocument } from './schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from '../rooms/schemas/room.schema';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>) {}

  async create(room: Room, sender: User, content: string): Promise<Message> {
    const dateMessage = new Date();
    const createdMessage = new this.messageModel({
      room,
      sender,
      content,
      created_at: dateMessage,
      updated_at: dateMessage,
    });
    const message = await createdMessage.save();
    const newMessage: MessageDocument = message.toObject();

    return newMessage;
  }

  async findAll(): Promise<Message[]> {
    return await this.messageModel.find().exec();
  }

  async findOneByIdModel(_id: string): Promise<Message> {
    return await this.messageModel.findOne({ _id });
  }

  async findOneById(id: string): Promise<Message> {
    return await this.messageModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<Message> {
    return await this.messageModel.findOne({ email }).exec();
  }

  async findAllByRoom(room: Room): Promise<Message[]> {
    return await this.messageModel
      .find({ room: room._id })
      .populate({ path: 'sender', select: ['_id', 'firstName', 'lastName', 'email'] })
      .sort('created_at')
      .exec();
  }

  async remove(id: string): Promise<Message> {
    return await this.messageModel.findByIdAndRemove(id).exec();
  }
}
