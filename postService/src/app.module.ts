import { Module } from '@nestjs/common';
import { MessageBusModule } from './message-bus/message-bus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { get } from 'config';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule, MessageBusModule, MongooseModule.forRoot(get('database_url'))],
})
export class AppModule {}
