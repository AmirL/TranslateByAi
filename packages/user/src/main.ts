import { NestFactory } from '@nestjs/core';
import { UserModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Queues } from '@translate-by-ai/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
      debug: false,
      queue: Queues.USER,
    },
  });

  await app.listen();
}
bootstrap();
