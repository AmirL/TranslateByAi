import { Inject, Injectable } from '@nestjs/common';
import { RequestTranslation } from './dto/request-translation.input';
import { generate as shortUUID } from 'short-uuid';
import { Translation } from './entities/translation.entity';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TranslateService {
  constructor(@Inject('AI_SERVICE') private readonly client: ClientProxy) {}

  async translate(input: RequestTranslation): Promise<Translation> {
    const translationRequest: Translation = {
      id: shortUUID(),
      languageTarget: input.languageTarget,
      text: input.text,
    };
    console.log(
      'Sending message to ai.translate',
      await firstValueFrom(
        this.client.send('ai.translate', translationRequest),
      ),
    );

    return translationRequest;
  }
}
