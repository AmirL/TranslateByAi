import { Injectable } from '@nestjs/common';
import { Translation } from './entities/translation.entity';
import { MessagingService } from '../messaging-module/messaging.service';
import { RequestTranslation } from './dto/request-translation.input';
import { generate as shortUUID } from 'short-uuid';

@Injectable()
export class TranslateService {
  constructor(private readonly messagingService: MessagingService) {}

  async translate(input: RequestTranslation): Promise<Translation> {
    const translationRequest: Translation = {
      id: shortUUID(),
      languageTarget: input.languageTarget,
      text: input.text,
      translatedText: '',
    };

    await this.messagingService.emit('ai.translate', translationRequest);

    return translationRequest;
  }
}
