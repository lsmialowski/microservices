import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './post.schema';

describe('PostService', () => {
  let service: PostService;
  class mockModel {
    constructor(public data?: any) {}

    static find(args){
      return {select: () => args}
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, {
        provide: getModelToken(Post.name),
        useValue: mockModel,
      }],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  describe('Check if methods are defined', () => {
    it('should be defined and named correctly', () => {
      expect(service).toBeDefined();
      expect(service.getPostsOlderThan).toBeDefined();
    });
  });

  describe('Check if methods work properly', () => {
    it('should return posts older than given date', async () => {
      const date = (new Date()).toISOString();
      const post = await service.getPostsOlderThan((new Date()).toISOString());
      expect((post as any).createdAt.$gt).toBe(date);
    });
  });
});
