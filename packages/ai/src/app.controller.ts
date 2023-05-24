import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ITranslation, MESSAGE } from '@translate-by-ai/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(MESSAGE.AI_TRANSLATE)
  async translate(data: ITranslation) {
    console.log('Received message from ai.translate', data);

    this.appService.translate(data);

    return { success: true };
  }
}
