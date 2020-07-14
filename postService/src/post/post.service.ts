import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { PostDTO } from './post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  create(postData: PostDTO): Promise<Post> {
    const post = new this.postModel(postData);

    return post.save();
  }
}
