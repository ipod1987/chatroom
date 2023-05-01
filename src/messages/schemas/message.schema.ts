import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Room } from '../../rooms/schemas/room.schema';
import { User } from '../../users/schemas/user.schema';

@Schema()
export class Message extends Document {
  _id: string;

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

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
