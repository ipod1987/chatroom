import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Room } from '../../rooms/schemas/room.schema';
import { User } from '../../users/schemas/user.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: User;

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  room: Room;

  @Prop()
  content: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
