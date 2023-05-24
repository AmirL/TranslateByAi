import { NestFactory } from '@nestjs/core';
import { AiModule } from './ai.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Queues } from '@translate-by-ai/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AiModule,
    {
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:4222',
        debug: false,
        queue: Queues.AI,
      },
    },
  );
  await app.listen();
}
bootstrap();
