import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { exchange } from './exchange.constants';
import { get } from 'config';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, {
    exchanges: [exchange.post, exchange.user],
    uri: get('rabbit_mq_url'),
  })],
  exports: [RabbitMQModule]
})
export class MessageBusModule {}
