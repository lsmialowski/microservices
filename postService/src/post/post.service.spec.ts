import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './post.schema';

describe('PostService', () => {
  let service: PostService;
  function postRepositoryMock(dto) {
    this.data = dto;
    this.save = async () => {
      return this.data;
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, {
        provide: getModelToken(Post.name),
        useValue: postRepositoryMock,
      }],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  describe('Check if methods are defined', () => {
    it('should be defined and named correctly', () => {
      expect(service).toBeDefined();
      expect(service.create).toBeDefined();
    });
  });

  describe('Check if methods work properly', () => {
    it('should save and return post', async () => {
      const postMock = {imgUrl: 'http://www.google.pl'};
      const post = await service.create(postMock);
      expect(post.imgUrl).toBe('http://www.google.pl');
    });

  });
});
