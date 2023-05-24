import { ObjectType } from '@nestjs/graphql';
import { ISentence } from '@translate-by-ai/common';

@ObjectType()
export class Sentence implements ISentence {
  original: string;
  translated: string;
}
