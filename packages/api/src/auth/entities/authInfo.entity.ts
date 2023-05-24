import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthInfo {
  token: string;
}
