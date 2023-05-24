import { Module } from '@nestjs/common';

import { TranslateModule } from './translate/translate.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [TranslateModule],
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TranslateModule,
  ],
  providers: [],
})
export class AppModule {}
