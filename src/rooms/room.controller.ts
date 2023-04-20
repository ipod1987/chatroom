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
import { User } from '../users/schemas/user.schema';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: 'Create a Room' })
  @ApiResponse({ status: 201, description: 'Room created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  async createRoom(@Body('name') name: string): Promise<Room> {
    const room = await this.roomService.createRoom(name);
    return room;
  }

  @ApiOperation({ summary: 'Add a Member to a Room' })
  @ApiResponse({ status: 201, description: 'Member added' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @Patch(':id/users')
  async addUserToRoom(@Param('roomId') roomId: string, @Body() user: User): Promise<Room> {
    const room = await this.roomService.addMember(roomId, user);
    return room;
  }

  @ApiOperation({ summary: 'Send a Message to a Room' })
  @ApiResponse({ status: 201, description: 'Message sent', type: Room })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @Patch(':id/messages')
  async sendMessageToRoom(
    @Param('id') roomId: string,
    @Body() data: { userId: string; message: string },
  ): Promise<Room> {
    return await this.roomService.sendMessage(roomId, data.userId, data.message);
  }

  @Get(':roomId/latest-messages')
  @ApiOperation({ summary: 'Get the latest messages from a room' })
  @ApiResponse({
    status: 200,
    description: 'Latest messages',
    type: Message,
    isArray: true,
  })
  async getLatestMessages(
    @Param('roomId') roomId: string,
    @Body('limit') limit: number,
  ): Promise<Message[]> {
    const messages = await this.roomService.getLatestMessages(roomId, limit);
    return messages;
  }
}
