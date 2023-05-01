import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './schemas/room.schema';
import { Room } from './schemas/room.schema';
import { UserModule } from '../users/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
        collection: 'rooms',
      },
    ]),
    UserModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
