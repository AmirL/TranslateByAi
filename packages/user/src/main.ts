import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices';
import { NATS_SERVER, Queues } from '@translate-by-ai/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.NATS,
    options: {
      servers: NATS_SERVER,
      debug: false,
      queue: Queues.USER,
    },
  });

  await app.listen();
}
bootstrap();
