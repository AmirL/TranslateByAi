import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';

@Controller('translate')
export class TranslateController {
  constructor(
    @Inject('AI_SERVICE') private readonly client: ClientProxy,
    private readonly pubSub: PubSub,
  ) {}

  @EventPattern('api.translated')
  async translate(data: Record<string, unknown>) {
    Logger.log(
      'Received message from api.translated',
      data,
      'TranslateController',
    );
    this.pubSub.publish('translationReceived', { translationReceived: data });
  }
}
