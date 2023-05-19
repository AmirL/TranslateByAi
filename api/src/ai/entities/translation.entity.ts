import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Translation {
  @Field(() => String, { description: "The source language of the text" })
  languageSource: string;

  @Field(() => String, { description: "The target language of the text" })
  languageTarget: string;

  @Field(() => String, { description: "The translated text" })
  text: string;

  // TODO list of all words in the text with their translations
}