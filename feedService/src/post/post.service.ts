import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { exchange } from '../message-bus/exchange.constants';
import { Post } from './post.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  @RabbitSubscribe({
    exchange: exchange.post.name,
    routingKey: 'create',
    queue: `${exchange.post.name}.feed`,
  })
  private async userCreateHandler(payload: {_id: string, imgUrl: string, __v: number}) {
    const postObjectId = mongoose.Types.ObjectId(payload._id);

    const post = new this.postModel({
      imgUrl: payload.imgUrl,
      createdAt: postObjectId.getTimestamp().toISOString(),
      postId: payload._id
    });

    await post.save();

    return new Nack();
  }

  async getPostsOlderThan(date: string): Promise<Post[]> {
    return this.postModel.find({createdAt: {$gt: date }}).select({imgUrl: 1, postId: 1, _id: 0});
  }
}
