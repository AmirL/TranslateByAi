import { Injectable } from '@nestjs/common';
import { Translation } from './entities/translation.entity';

@Injectable()
export class AiService {

  translate(): Translation {
    return {
      languageSource: "en",
      languageTarget: "fr",
      text: "Hello world!",
    };
  }
}
