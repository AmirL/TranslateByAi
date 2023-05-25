import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { TranslateService as TranslateService } from './translate.service';
import { RequestTranslation as RequestTranslationInput } from './dto/request-translation.input';
import { PubSub } from 'graphql-subscriptions';
import { Translation } from './entities/translation.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoggedUser } from 'src/auth/auth.decorators';
import { ITranslation, IUser } from '@translate-by-ai/common';

@Resolver()
export class TranslateResolver {
  constructor(
    private readonly translateService: TranslateService,
    private readonly pubSub: PubSub,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Translation)
  requestTranslation(
    @Args('input') input: RequestTranslationInput,
    @LoggedUser() user: IUser,
  ) {
    return this.translateService.translate(input, user.id);
  }

  @Subscription(() => Translation, {
    filter: (payload, variables, context) => {
      const translation: ITranslation = payload.translationReceived;
      const user: IUser = context?.req?.user;
      return translation.user_id === user.id;
    },
  })
  translationReceived() {
    return this.pubSub.asyncIterator('translationReceived');
  }
}
