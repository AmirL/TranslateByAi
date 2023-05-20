import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { TranslateService as TranslateService } from './translate.service';

import { RequestTranslation as RequestTranslationInput } from './dto/request-translation.input';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Translation } from './entities/translation.entity';

@Resolver()
export class TranslateResolver {
  constructor(
    private readonly translateService: TranslateService,
    private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Translation)
  requestTranslation(@Args('input') input: RequestTranslationInput) {
    return this.translateService.translate(input);
  }

  @Query(() => Translation, { name: 'translate' })
  translate() {
    const translation: Translation = {
      id: '123',
      languageSource: 'en',
      languageTarget: 'fr',
      text: 'Hello world!',
      translatedText: 'Bonjour le monde!',
    };
    return translation;
  }

  @Subscription(() => Translation)
  translationReceived() {
    return this.pubSub.asyncIterator('translationReceived');
  }
}
