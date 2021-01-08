import { Injectable } from '@nestjs/common';
import { userList } from './users.mock';

// Should be a real class or interface
export type User = any;

@Injectable()
export class UsersService {
  async find(userId: string): Promise<User | undefined> {
    return userList.find((user) => user.userId === userId);
  }

  async findByName(username: string): Promise<User | undefined> {
    return userList.find((user) => user.username === username);
  }
}
