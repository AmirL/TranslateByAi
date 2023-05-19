import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
      debug: false,
    },
  });
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
