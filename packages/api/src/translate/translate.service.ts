import { Inject, Injectable, Logger } from '@nestjs/common';
import { RequestTranslation } from './dto/request-translation.input';
import { generate as shortUUID } from 'short-uuid';
import { Translation } from './entities/translation.entity';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { AI_SERVICE } from './translate.const';
import { MESSAGE } from '@translate-by-ai/common';
import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class TranslateService {
  constructor(
    @Inject(AI_SERVICE) private readonly client: ClientProxy,
    private readonly pubSub: PubSub,
  ) {}

  async translate(input: RequestTranslation): Promise<Translation> {
    const translationRequest: Translation = {
      id: shortUUID(),
      languageTarget: input.languageTarget,
      text: input.text,
    };
    Logger.log('Sending message to ai.translate', 'TranslateService');

    const result = await firstValueFrom(
      this.client.send(MESSAGE.AI_TRANSLATE, translationRequest).pipe(
        timeout(3000),
        catchError((error) => of({ success: false, error })),
      ),
    );

    if (!result.success) {
      Logger.error(result.error, 'TranslateService');
      throw new GraphQLError('Error sending message to ai.translate', {});
    }

    // send the translation request to the client subscription
    this.pubSub.publish('translationReceived', {
      translationReceived: translationRequest,
    });

    return translationRequest;
  }
}
