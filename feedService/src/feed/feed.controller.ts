import { BadRequestException, Controller, Get, Headers } from '@nestjs/common';
import { Post } from '../post/post.schema';
import { ERRORS } from '../common/errors';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) { }
  @Get()
  async get(@Headers('user') userId?: string): Promise<Post[]>{
    if(!userId){
      throw new BadRequestException(ERRORS.HEADER_NOT_FOUND)
    }
    return this.feedService.get(userId);
  }
}
