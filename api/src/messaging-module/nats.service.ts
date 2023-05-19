import { Injectable } from '@nestjs/common';
import { MessagingService } from './messaging.service';

@Injectable()
export class NatsService implements MessagingService {
  async send(subject: string, payload: any): Promise<any> {
    console.log(`NatsService: send ${subject} ${JSON.stringify(payload)}`);
    return Promise.resolve();
  }
}
