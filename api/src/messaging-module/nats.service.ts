import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import {
  ClientProxy,
  ClientProxyFactory,
  EventPattern,
  Transport,
} from '@nestjs/microservices';
import { MESSAGE_SERVICE } from './messaging.constants';

@Injectable()
export class NatsService implements MessagingService {
  private readonly logger: LoggerService = new Logger(NatsService.name);

  constructor(@Inject(MESSAGE_SERVICE) private readonly client: ClientProxy) {}

  async emit(subject: string, payload: any): Promise<any> {
    this.logger.log(`emit event ${subject} ${JSON.stringify(payload)}`);
    return this.client.emit(subject, payload);
  }
}
