import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateResolver } from './translate.resolver';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { TranslateController } from './translate.controller';
import { PubSub } from 'graphql-subscriptions';
import { AI_SERVICE } from './translate.const';
import { NATS_SERVER, Queues } from '@translate-by-ai/common';

@Module({
  providers: [TranslateResolver, TranslateService, PubSub],
  imports: [
    ClientsModule.register([
      {
        name: AI_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: NATS_SERVER,
          queue: Queues.AI,
          debug: false,
        },
      },
    ]),
  ],
  controllers: [TranslateController],
})
export class TranslateModule {}
