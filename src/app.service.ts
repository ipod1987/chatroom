import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Chatroom challenge by Engels Medina, engelsabdel@gmail.com';
  }
}
