import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MessageBusModule } from './message-bus/message-bus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { get } from 'config';

@Module({
  imports: [UserModule, MessageBusModule, MongooseModule.forRoot(get('database_url'))],
})
export class AppModule {}
