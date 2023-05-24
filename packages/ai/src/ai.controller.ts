import { Controller, Logger } from '@nestjs/common';
import { AiService } from './ai.service';
import { MessagePattern } from '@nestjs/microservices';
import { ITranslation, MESSAGE } from '@translate-by-ai/common';

@Controller()
export class AiController {
  constructor(private readonly appService: AiService) {}

  @MessagePattern(MESSAGE.AI_TRANSLATE)
  async translate(data: ITranslation) {
    Logger.log('Received message from ai.translate', data);

    this.appService.translate(data);

    return true;
  }
}
