import { BadRequestException, Injectable } from '@nestjs/common';
import { ERRORS } from '../common/errors';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { Post } from '../post/post.schema';

@Injectable()
export class FeedService {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService
  ) { }

  async get(userId: string): Promise<Post[]>{
    const user = await this.userService.get(userId);

    if(!user){
      throw new BadRequestException(ERRORS.USER_NOT_FOUND)
    }

    const posts = await this.postService.getPostsOlderThan(user.lastSeen);
    await this.userService.updateLastSeen(user.id, (new Date()).toISOString());

    return posts;
  }
}
