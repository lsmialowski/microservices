import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MessageBusModule } from '../message-bus/message-bus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [MessageBusModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
