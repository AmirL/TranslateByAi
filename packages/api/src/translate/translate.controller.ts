import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { AI_SERVICE } from './translate.const';
import { EVENT } from '@translate-by-ai/common';

@Controller('translate')
export class TranslateController {
  constructor(
    @Inject(AI_SERVICE) private readonly client: ClientProxy,
    private readonly pubSub: PubSub,
  ) {}

  @EventPattern(EVENT.TEXT_TRANSLATED)
  async translate(data: Record<string, unknown>) {
    Logger.log(
      'Received message from api.translated',
      data,
      'TranslateController',
    );
    this.pubSub.publish('translationReceived', { translationReceived: data });
  }
}
