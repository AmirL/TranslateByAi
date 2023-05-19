import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateResolver } from './translate.resolver';
import { MessagingModule } from 'src/messaging-module/messaging.module';

@Module({
  providers: [TranslateResolver, TranslateService],
  imports: [MessagingModule],
})
export class TranslateModule {}
