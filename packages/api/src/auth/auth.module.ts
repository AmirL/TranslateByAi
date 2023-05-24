import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from './auth.const';
import { Queues } from '@translate-by-ai/common';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
          queue: Queues.USER,
          debug: false,
        },
      },
    ]),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
