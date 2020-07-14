import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MessageBusModule } from '../message-bus/message-bus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';

@Module({
  imports: [MessageBusModule, MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
