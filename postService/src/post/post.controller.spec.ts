import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { MessageBusService } from '../message-bus/message-bus.service';
import { PostService } from './post.service';

describe('Post Controller', () => {
  let controller: PostController;
  const messageBusServiceMock = {publishPostCreateEvent: jest.fn(async () => ({}))};
  const postServiceMock = {create: jest.fn(async () => ({imgUrl: 'www.example.com', id: '31deebb3-1cf9-4d1f-909a-46ed2002e9b6'}))};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: MessageBusService,
          useValue: messageBusServiceMock,
        },        {
          provide: PostService,
          useValue: postServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });
  describe('Check if methods are defined', () => {
    it('should be defined and named correctly', () => {
      expect(controller).toBeDefined();
      expect(controller.create).toBeDefined();
    });
  });

  describe('Check if methods work properly', () => {
    it('should create post and publish event', async () => {
      const bodyMock = {imgUrl: 'www.example.com'};
      await controller.create(bodyMock);
      expect(postServiceMock.create).toBeCalledWith(bodyMock);
      expect(messageBusServiceMock.publishPostCreateEvent).toBeCalledWith({imgUrl: 'www.example.com', id: '31deebb3-1cf9-4d1f-909a-46ed2002e9b6'});
    });
  });
});
