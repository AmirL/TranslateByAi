import { Controller, Inject } from '@nestjs/common';
import { MESSAGE_SERVICE } from './messaging.constants';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('messaging')
export class MessagingController {
  constructor(@Inject(MESSAGE_SERVICE) private readonly client: ClientProxy) {}

  @EventPattern('api.translated')
  async translate(data: Record<string, unknown>) {
    console.log('Received message from api.translated', data);
  }
}
