import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { Message } from '../messages/schemas/message.schema';
import { AddUserDto, CreateRoomDto, SendMessageDto } from './dto/room.dto';
import { Types } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async createRoom(dataDto: CreateRoomDto): Promise<Room> {
    const roomSearch = await this.findRoomByName(dataDto.name);
    if (roomSearch.length > 0) {
      throw new NotFoundException(`Room with name ${dataDto.name} already exist`);
    }
    const room = new this.roomModel({ name: dataDto.name });
    return await room.save();
  }

  async addMember(roomId: string, userDto: AddUserDto): Promise<Room> {
    const room = await this.findRoomById(roomId);
    //find the user if is real with service, for continue the operation
    /*
    if (room.members.find((member) => member.email === userDto.email)) {
      throw new BadRequestException(
        `User with email ${user.email} already belongs to room with id ${roomId}`,
      );
    }
    room.members.push(user);*/
    return null; // await room.save();
  }

  async sendMessage(roomId: string, messageDto: SendMessageDto): Promise<Room> {
    const room = await this.findRoomById(roomId);
    //room.messages.push(message);
    return null; // await room.save();
  }

  async getLatestMessages(roomId: string, limit: number): Promise<Message[]> {
    const room = await this.findRoomById(roomId);
    return room.messages.slice(-limit);
  }

  private async findRoomById(roomId: string): Promise<Room> {
    if (!roomId || !Types.ObjectId.isValid(roomId)) {
      throw new NotFoundException(`the room id: '${roomId}' is not valid`);
    }
    const room = await this.roomModel.findById(roomId);
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }
    return room;
  }

  private async findRoomByName(name: string): Promise<Room[]> {
    return await this.roomModel.find({ name }).exec();
  }
}
