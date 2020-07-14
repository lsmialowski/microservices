import { Test, TestingModule } from '@nestjs/testing';
import { MessageBusService } from './message-bus.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { exchange } from './exchange.constants';

describe('MessageBusService', () => {
  let service: MessageBusService;
  const amqpConnectionMock = { publish: jest.fn(async () => ({}))};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageBusService,
        {
          provide: AmqpConnection,
          useValue: amqpConnectionMock,
        },
        ],
    }).compile();

    service = module.get<MessageBusService>(MessageBusService);
  });
  describe('Check if methods are defined', () => {
    it('should be named [Exchange] [routing-key] Event', () => {
      expect(service).toBeDefined();
      expect(service.publishUserCreateEvent).toBeDefined();
    });
  });

  describe('Check if methods work properly', () => {
    it('should call amqpConnection publish() method', async () => {
      const userMock: any = { email: 'asd@asd.pl' };
      await service.publishUserCreateEvent(userMock)
      expect(amqpConnectionMock.publish).toBeCalledWith(exchange.user.name, 'create', userMock);
    });
  });
});
