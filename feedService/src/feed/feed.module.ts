import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { FeedService } from './feed.service';

@Module({
  imports: [PostModule, UserModule],
  controllers: [FeedController],
  providers: [FeedService]
})
export class FeedModule {}
