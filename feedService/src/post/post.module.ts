import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { MessageBusModule } from '../message-bus/message-bus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MessageBusModule, UserModule, MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
