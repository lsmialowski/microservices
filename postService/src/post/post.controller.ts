import { Controller, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { MessageBusService } from '../message-bus/message-bus.service';
import { PostDTO } from './post.dto';

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
    private readonly messageBusService: MessageBusService,
  ) {}

  @Post()
  async create(@Body() body: PostDTO): Promise<PostDTO> {
    const post = await this.postService.create(body);
    await this.messageBusService.publishPostCreateEvent(post);

    return post;
  }
}
