import { Field, ObjectType } from '@nestjs/graphql';
import { IUser } from '@translate-by-ai/common';

@ObjectType()
export class User implements IUser {
  @Field(() => String, { description: 'The id of the user' })
  id: string;
  @Field(() => String, { description: 'The email of the user' })
  email: string;
}
