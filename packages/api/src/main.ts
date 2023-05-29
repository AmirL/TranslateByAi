import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NATS_SERVER } from '@translate-by-ai/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: NATS_SERVER,
      debug: false,
    },
  });
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
