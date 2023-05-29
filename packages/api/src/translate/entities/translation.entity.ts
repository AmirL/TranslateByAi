import { Field, ObjectType } from '@nestjs/graphql';
import { ISentence, ITranslation } from '@translate-by-ai/common';
import { Sentence } from './sentence.entity';

@ObjectType()
export class Translation implements ITranslation {
  @Field(() => String, { description: 'The id of the translation' })
  id: string;

  @Field(() => String, { description: 'The source language of the text' })
  languageSource?: string;

  @Field(() => String, { description: 'The target language of the text' })
  languageTarget: string;

  @Field(() => String, { description: 'The original text' })
  text: string;

  @Field(() => [Sentence], { description: 'The original text' })
  sentences?: ISentence[];

  @Field(() => String)
  user_id: string;
}
