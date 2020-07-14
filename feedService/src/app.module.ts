import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { get } from 'config';
import { UserModule } from './user/user.module';
import { MessageBusModule } from './message-bus/message-bus.module';
import { PostModule } from './post/post.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [MongooseModule.forRoot(get('database_url')), UserModule, MessageBusModule, PostModule, FeedModule],
})
export class AppModule {}
