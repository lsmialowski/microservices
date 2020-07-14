import { Module } from '@nestjs/common';
import { MessageBusService } from './message-bus.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { exchange } from './exchange.constants';
import { get } from 'config';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, {
    exchanges: [exchange.post],
    uri: get('rabbit_mq_url'),
    connectionInitOptions: { wait: true },
  })],
  providers: [MessageBusService],
  exports: [MessageBusService]
})
export class MessageBusModule {}
