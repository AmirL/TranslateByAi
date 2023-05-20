import { TranslateService as TranslateService } from './translate.service';
import { RequestTranslation as RequestTranslationInput } from './dto/request-translation.input';
import { PubSub } from 'graphql-subscriptions';
import { Translation } from 'common/translation.entity';
export declare class TranslateResolver {
    private readonly translateService;
    private readonly pubSub;
    constructor(translateService: TranslateService, pubSub: PubSub);
    requestTranslation(input: RequestTranslationInput): any;
    translate(): Translation;
    translationReceived(): AsyncIterator<unknown, any, undefined>;
}
