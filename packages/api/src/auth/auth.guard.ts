import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@translate-by-ai/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user: IUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // todo validate user
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
