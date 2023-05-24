import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInfo } from './entities/authInfo.entity';
import { SignInInput } from './dto/sign-in.input';

import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { LoggedUser } from './auth.decorators';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthInfo)
  signIn(@Args('input') input: SignInInput) {
    return this.authService.signIn(input);
  }

  @Mutation(() => AuthInfo)
  signUp(@Args('input') input: SignInInput) {
    return this.authService.signUp(input);
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async me(@LoggedUser() user: User) {
    return user;
  }
}
