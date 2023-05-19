import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class NatsService implements MessagingService {
  private readonly client: ClientProxy;

  private readonly logger: LoggerService = new Logger(NatsService.name);

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:4222',
      },
    });
  }

  async emit(subject: string, payload: any): Promise<any> {
    this.logger.log(`emit event ${subject} ${JSON.stringify(payload)}`);
    return this.client.emit(subject, payload);
  }
}
