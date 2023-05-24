import { Inject, Injectable } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import * as bcrypt from '@node-rs/bcrypt';
import { AuthInfo } from './entities/authInfo.entity';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from './auth.const';
import { IUser, MESSAGE } from '@translate-by-ai/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(USER_SERVICE) private readonly userMicroservice: ClientProxy,
  ) {}

  async signIn(input: SignInInput): Promise<AuthInfo> {
    const user: IUser = await firstValueFrom(
      this.userMicroservice.send(MESSAGE.USER.FIND_BY_MAIL, {
        mail: input.email,
      }),
    );

    if (user && (await bcrypt.compare(input.password, user.hashedPassword))) {
      return await this.signInUser(user);
    } else {
      throw new GraphQLError('Invalid credentials');
    }
  }

  async signUp(input: SignInInput): Promise<AuthInfo> {
    const user = await firstValueFrom(
      this.userMicroservice.send(MESSAGE.USER.FIND_BY_MAIL, {
        mail: input.email,
      }),
    );

    if (user) {
      throw new GraphQLError('User already exists');
    }

    const userRequest: IUser = {
      id: '',
      email: input.email,
      hashedPassword: await bcrypt.hash(input.password, 10),
    };
    const createdUser: IUser = await firstValueFrom(
      this.userMicroservice.send(MESSAGE.USER.CREATE, userRequest),
    );

    return await this.signInUser(createdUser);
  }

  private async signInUser(user: IUser): Promise<AuthInfo> {
    return {
      token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
