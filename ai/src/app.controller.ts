import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Translation } from './entities/translation.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('ai.translate')
  async translate(data: Translation) {
    console.log('Received message from ai.translate', data);
    data.languageSource = 'en';
    data.translatedText = 'TRANSLATED TEXT FROM AI';
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.appService.sendTranslated(data);
  }
}
