import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { exchange } from './exchange.constants';
import { Post } from '../post/post.schema';

@Injectable()
export class MessageBusService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publishPostCreateEvent(payload: Post): Promise<void> {
      return this.amqpConnection.publish(exchange.post.name, 'create', payload);
  }
}
