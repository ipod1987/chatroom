import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { RoomService } from './room.service';
import { Room } from './schemas/room.schema';
import { Message } from '../messages/schemas/message.schema';
import { AddUserDto, CreateRoomDto, GetLatestMessagesDto, SendMessageDto } from './dto/room.dto';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: 'Create a Room' })
  @ApiResponse({ status: 201, description: 'Room created', type: Room })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    const room = await this.roomService.createRoom(createRoomDto);
    return room;
  }

  @ApiOperation({ summary: 'Add a Member to a Room' })
  @ApiResponse({ status: 201, description: 'Member added' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @Patch(':roomId/users')
  async addUserToRoom(
    @Param('roomId') roomId: string,
    @Body() addUserDto: AddUserDto,
  ): Promise<Room> {
    const room = await this.roomService.addMember(roomId, addUserDto);
    return room;
  }

  @ApiOperation({ summary: 'Send a Message to a Room' })
  @ApiResponse({ status: 201, description: 'Message sent', type: Room })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @Patch(':roomId/messages')
  async sendMessageToRoom(
    @Param('roomId') roomId: string,
    @Body() data: SendMessageDto,
  ): Promise<Room> {
    return await this.roomService.sendMessage(roomId, data);
  }

  @Post(':roomId/latest-messages')
  @ApiOperation({ summary: 'Get the latest messages from a room' })
  @ApiResponse({
    status: 200,
    description: 'Latest messages',
    type: Message,
    isArray: true,
  })
  async getLatestMessages(
    @Param('roomId') roomId: string,
    @Body() data: GetLatestMessagesDto,
  ): Promise<Message[]> {
    const messages = await this.roomService.getLatestMessages(roomId, data.limit);
    return messages;
  }
}
