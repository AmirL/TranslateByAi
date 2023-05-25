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
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromRequest(request);
    const user = await AuthGuard.authorizeRequest(token);
    request['user'] = user;
    return true;
  }

  public static async authorizeRequest(token: string): Promise<IUser> {
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
      const user: IUser = await jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }

  public static extractTokenFromConnection(context: any): string | undefined {
    const [type, token] =
      context.connectionParams?.Authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
