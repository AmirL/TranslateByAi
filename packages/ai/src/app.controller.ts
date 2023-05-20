import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ITranslation } from '@translate-by-ai/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('ai.translate')
  async translate(data: ITranslation) {
    console.log('Received message from ai.translate', data);

    setTimeout(() => {
      data.languageSource = 'en';
      data.translatedText =
        'TRANSLATED TEXT FROM AI ' + Math.ceil(Math.random() * 100).toString();
      this.appService.sendTranslated(data);
    }, 1000);

    return { success: true };
  }
}
