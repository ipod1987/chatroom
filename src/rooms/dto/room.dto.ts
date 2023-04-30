export class CreateRoomDto {
  name: string;
}

export class AddUserDto {
  userId: string;
}

export class SendMessageDto {
  userId: string;
  message: string;
}

export class GetLatestMessagesDto {
  limit: number;
}
