import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { EVENT } from '@translate-by-ai/common';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:4222',
        debug: false,
      },
    });
  }

  async sendTranslated(payload: any) {
    await this.client.emit(EVENT.TEXT_TRANSLATED, payload);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
