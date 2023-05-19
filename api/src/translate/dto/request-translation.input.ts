import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RequestTranslation {
  @Field(() => String, { description: 'The target language of the text' })
  languageTarget: string;

  @Field(() => String, { description: 'The translated text' })
  text: string;
}
