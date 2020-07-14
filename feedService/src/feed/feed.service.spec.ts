import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from './feed.service';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

describe('FeedService', () => {
  let service: FeedService;
  const userServiceMock = {
    get: jest.fn(() => ({lastSeen: 'fakeDate'})),
    updateLastSeen: jest.fn(() => ({}))
  };
  const postServiceMock = {getPostsOlderThan: jest.fn(() => ({}))};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedService,
        {provide: PostService, useValue: postServiceMock},
        {provide: UserService, useValue: userServiceMock}
      ],
    }).compile();

    service = module.get<FeedService>(FeedService);
  });
  describe('Check if methods are defined', () => {

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
  it('should get feed and update last seen', async () => {
    await service.get('fakeUserId');
    expect(userServiceMock.get).toBeCalledWith('fakeUserId');
    expect(userServiceMock.updateLastSeen).toBeCalled();
  });
});
