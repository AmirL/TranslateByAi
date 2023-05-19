import { Injectable } from '@nestjs/common';
import { Translation } from './entities/translation.entity';
import { MessagingService } from '../messaging-module/messaging.service';

@Injectable()
export class AiService {
  constructor(private readonly messagingService: MessagingService) {}

  async translate(): Promise<Translation> {
    await this.messagingService.emit('ai.translate', {
      some: 'data',
    });

    return {
      languageSource: 'en',
      languageTarget: 'fr',
      text: 'Hello world!',
    };
  }
}
