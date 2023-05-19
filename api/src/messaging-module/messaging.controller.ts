import { Controller, Inject } from '@nestjs/common';
import { MESSAGE_SERVICE } from './messaging.constants';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';

@Controller('messaging')
export class MessagingController {
  constructor(
    @Inject(MESSAGE_SERVICE) private readonly client: ClientProxy,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @EventPattern('api.translated')
  async translate(data: Record<string, unknown>) {
    console.log('Received message from api.translated', data);
    this.pubSub.publish('translationReceived', { translationReceived: data });
  }
}
