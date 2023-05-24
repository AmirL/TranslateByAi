import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUser, MESSAGE } from '@translate-by-ai/common';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @MessagePattern(MESSAGE.USER.FIND_BY_MAIL)
  async findByMail({ mail }: { mail: string }): Promise<IUser | null> {
    return (await this.appService.findOneByEmail(mail)) || null;
  }

  @MessagePattern(MESSAGE.USER.CREATE)
  async create(user: IUser): Promise<IUser> {
    return await this.appService.create(user);
  }

  @MessagePattern(MESSAGE.USER.FIND_BY_ID)
  async findById({ id }: { id: string }): Promise<IUser | null> {
    return (await this.appService.findOneById(id)) || null;
  }
}
