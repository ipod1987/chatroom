import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { Message } from '../messages/schemas/message.schema';
import { AddUserDto, CreateRoomDto, SendMessageDto } from './dto/room.dto';
import { Types } from 'mongoose';
import { UsersService } from '../users/user.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomModel.find({}).exec();
  }

  async createRoom(dataDto: CreateRoomDto): Promise<Room> {
    const roomSearch = await this.findRoomByName(dataDto.name);
    if (roomSearch.length > 0) {
      throw new NotFoundException(`Room with name ${dataDto.name} already exist`);
    }
    const room = new this.roomModel({ name: dataDto.name });
    return await room.save();
  }

  async addMember(roomId: string, userDto: AddUserDto): Promise<Room> {
    this.validateId(roomId);
    const room = await this.roomModel.findById({ _id: roomId }).exec();
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }
    const user = await this.usersService.findOneByIdModel(userDto.userId);
    if (room.members.length > 0) {
      if (room.members.some((member) => member._id.toString() === user._id.toString())) {
        throw new BadRequestException(
          `User with email '${user.email}' already belongs to room ${room.name}`,
        );
      }
    }
    room.members.push(user);
    await room.save();
    return this.findRoomByIdWithUsers(roomId);
  }

  async sendMessage(roomId: string, messageDto: SendMessageDto): Promise<Room> {
    this.validateId(roomId);
    const room = await this.findRoomById(roomId);
    // room.messages.push(message);
    return null; // await room.save();
  }

  async getLatestMessages(roomId: string, limit: number): Promise<Message[]> {
    const room = await this.findRoomById(roomId);
    return room.messages.slice(-limit);
  }

  private async findRoomById(roomId: string): Promise<Room> {
    this.validateId(roomId);
    const room = await this.roomModel.findById(roomId).exec();
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }
    return room;
  }

  private async findRoomByIdWithUsers(roomId: string): Promise<Room> {
    this.validateId(roomId);
    const room = await this.roomModel
      .findById(roomId)
      .populate({ path: 'members', select: ['_id', 'firstName', 'lastName', 'email'] })
      .exec();
    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }
    return room;
  }

  private async findRoomByName(name: string): Promise<Room[]> {
    return await this.roomModel.find({ name }).exec();
  }

  private validateId(roomId: string) {
    if (!roomId || !Types.ObjectId.isValid(roomId)) {
      throw new NotFoundException(`the room id: '${roomId}' is not valid`);
    }
  }
}
