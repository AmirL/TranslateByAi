import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { NatsService } from './nats.service';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { MESSAGE_SERVICE } from './messaging.constants';
import { MessagingController } from './messaging.controller';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    {
      provide: MessagingService,
      useClass: NatsService,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_SERVICE,
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
          debug: false,
        },
      },
    ]),
  ],
  exports: [MessagingService, 'PUB_SUB'],
  controllers: [MessagingController],
})
export class MessagingModule {}
