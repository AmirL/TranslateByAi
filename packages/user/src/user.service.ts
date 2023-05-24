import { Injectable } from '@nestjs/common';
import { IUser } from '@translate-by-ai/common';

@Injectable()
export class UserService {
  users: IUser[] = [];

  async findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async findOneById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async create(user: IUser) {
    user.id = String(this.users.length + 1);
    this.users.push(user);
    return user;
  }
}
