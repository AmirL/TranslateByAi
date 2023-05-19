import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { TranslateService as TranslateService } from './translate.service';
import { Translation } from './entities/translation.entity';
import { RequestTranslation as RequestTranslationInput } from './dto/request-translation.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver()
export class TranslateResolver {
  constructor(private readonly translateService: TranslateService) {}

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
    };
    return translation;
  }

  @Subscription(() => Translation)
  translationReceived() {
    return pubSub.asyncIterator('translationReceived');
  }
}
