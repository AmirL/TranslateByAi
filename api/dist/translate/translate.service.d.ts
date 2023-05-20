import { MessagingService } from '../messaging-module/messaging.service';
import { RequestTranslation } from './dto/request-translation.input';
import { Translation } from 'common/translation.entity';
export declare class TranslateService {
    private readonly messagingService;
    constructor(messagingService: MessagingService);
    translate(input: RequestTranslation): Promise<Translation>;
}
