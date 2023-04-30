import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { User } from './schemas/user.schema';
import { UsersService } from './user.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
