import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Message } from '../../messages/schemas/message.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: User.name })
  members: User[];

  @Prop({ type: [Types.ObjectId], ref: Message.name })
  messages: Message[];

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
