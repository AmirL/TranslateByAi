import { Injectable } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class NatsService implements MessagingService {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:4222',
      },
    });
  }

  async send(subject: string, payload: any): Promise<any> {
    console.log(`NatsService: send ${subject} ${JSON.stringify(payload)}`);
    return this.client.emit(subject, payload);
  }
}
