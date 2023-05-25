import { Module } from '@nestjs/common';

import { TranslateModule } from './translate/translate.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [TranslateModule, AuthModule],
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': {
          onConnect: async (context) => {
            const authToken = AuthGuard.extractTokenFromConnection(context);
            const user = await AuthGuard.authorizeRequest(authToken);
            context['user'] = user;
            return { user };
          },
        },
      },
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TranslateModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
