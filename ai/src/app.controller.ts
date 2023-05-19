import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('ai.translate')
  async translate(data: Record<string, unknown>) {
    console.log('Received message from ai.translate', data);
  }
}
