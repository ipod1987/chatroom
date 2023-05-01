import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessagesService } from './message.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
        collection: 'messages',
      },
    ]),
  ],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessageModule {}
