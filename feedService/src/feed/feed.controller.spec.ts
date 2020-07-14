import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { ERRORS } from '../common/errors';

describe('Feed Controller', () => {
  let controller: FeedController;
  const feedServiceMock = { get: jest.fn(async () => ({})) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {provide: FeedService, useValue: feedServiceMock},
      ]
    }).compile();

    controller = module.get<FeedController>(FeedController);
  });

  describe('Check if methods are defined', () => {
    it('should be defined and named correctly', () => {
      expect(controller).toBeDefined();
      expect(controller.get).toBeDefined();
    });
  });

  describe('Check if methods work properly', () => {
    it('should call feedService.get() with given userId', async() => {
      await controller.get('fakeUserId');
      expect(feedServiceMock.get).toBeCalledWith('fakeUserId')
    });

    it('should throw HEADER_NOT_FOUND when no header provided', async() => {
      try{
        await controller.get();
      }catch(error){
        expect(error.message).toBe(ERRORS.HEADER_NOT_FOUND);
      }
    });
  });
});
