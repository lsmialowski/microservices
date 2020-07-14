import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { exchange } from './exchange.constants';
import { User } from '../user/user.schema';

@Injectable()
export class MessageBusService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publishUserCreateEvent(payload: User): Promise<void> {
      return this.amqpConnection.publish(exchange.user.name, 'create', payload);
  }
}
