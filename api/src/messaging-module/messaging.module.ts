import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { NatsService } from './nats.service';

@Module({
  providers: [
    {
      provide: MessagingService,
      useClass: NatsService,
    },
  ],
  exports: [MessagingService],
})
export class MessagingModule {}
