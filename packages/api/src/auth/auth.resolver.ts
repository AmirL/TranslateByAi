import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInfo } from './entities/authInfo.entity';
import { SignInInput } from './dto/sign-in.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthInfo)
  signIn(@Args('input') input: SignInInput) {
    return this.authService.signIn(input);
  }
}
