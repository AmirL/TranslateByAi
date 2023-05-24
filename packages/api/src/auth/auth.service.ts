import { Injectable } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import * as bcrypt from '@node-rs/bcrypt';
import { AuthInfo } from './entities/authInfo.entity';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(input: SignInInput): Promise<AuthInfo> {
    // todo request user from UserMicroservice
    const password = 'admin';
    const user = {
      id: 1,
      email: 'admin',
      password: await bcrypt.hash(password, 10),
    };

    if (user && (await bcrypt.compare(input.password, user.password))) {
      return {
        token: await this.jwtService.signAsync({
          id: user.id,
          email: user.email,
        }),
      };
    } else {
      throw new GraphQLError('Invalid credentials');
    }
  }
}
