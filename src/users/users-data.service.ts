import { Injectable } from '@nestjs/common';
import { dateToArray } from '../shared/helper/date.helper';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO } from './dto/create-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(_user_: CreateUserDTO): ExternalUserDTO {
    const user: User = {
      ..._user_,
      id: uuidv4(),
    };
    this.users.push(user);
    return { ...user, dateOfBirth: dateToArray(user.dateOfBirth) };
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  updateUser(id: string, dto: UpdateUserDTO): User {
    const user = this.getUserById(id);
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = {
      ...user,
      ...dto,
    };
    return this.users[index];
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  getUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }
}
