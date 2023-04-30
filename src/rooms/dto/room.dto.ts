import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoomDto {
  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class AddUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}

export class GetLatestMessagesDto {
  // Validates for an integer
  @IsNumber({ allowNaN: false })
  @ApiProperty()
  limit: number;
}
