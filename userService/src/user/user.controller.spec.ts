import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { MessageBusService } from '../message-bus/message-bus.service';
import { UserService } from './user.service';

describe('User Controller', () => {
  let controller: UserController;
  const messageBusServiceMock = {publishUserCreateEvent: jest.fn(async () => ({}))};
  const userServiceMock = {create: jest.fn(async () => ({email: 'asdqwe@asd.pl', id: '31deebb3-1cf9-4d1f-909a-46ed2002e9b6'}))};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: MessageBusService,
          useValue: messageBusServiceMock,
        },        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });
  describe('Check if methods are defined', () => {
    it('should be defined and named correctly', () => {
      expect(controller).toBeDefined();
      expect(controller.create).toBeDefined();
    });
  });

  describe('Check if methods work properly', () => {
    it('should create user and publish event', async () => {
      const bodyMock = {email: 'asdqwe@asd.pl'};
      await controller.create(bodyMock);
      expect(userServiceMock.create).toBeCalledWith(bodyMock);
      expect(messageBusServiceMock.publishUserCreateEvent).toBeCalledWith({email: 'asdqwe@asd.pl', id: '31deebb3-1cf9-4d1f-909a-46ed2002e9b6'});
    });
  });
});
