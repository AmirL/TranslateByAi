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

@Module({
  providers: [
    {
      provide: MessagingService,
      useClass: NatsService,
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
  exports: [MessagingService],
  controllers: [MessagingController],
})
export class MessagingModule {}
