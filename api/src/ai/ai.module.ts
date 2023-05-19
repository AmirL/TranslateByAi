import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiResolver } from './ai.resolver';
import { MessagingModule } from 'src/messaging-module/messaging.module';

@Module({
  providers: [AiResolver, AiService],
  imports: [MessagingModule],
})
export class AiModule {}
