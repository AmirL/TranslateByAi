import { Field, ObjectType } from '@nestjs/graphql';

// TODO share between repos

@ObjectType()
export class Translation {
  @Field(() => String, { description: 'The id of the translation' })
  id: string;

  @Field(() => String, { description: 'The source language of the text' })
  languageSource?: string;

  @Field(() => String, { description: 'The target language of the text' })
  languageTarget: string;

  @Field(() => String, { description: 'The original text' })
  text: string;

  @Field(() => String, { description: 'The translated text' })
  translatedText: string;

  // TODO list of all words in the text with their translations
}
