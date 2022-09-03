import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data.service';
import { dateToArray } from '../shared/helper/date.helper';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Get(':id')
  getUserById(@Param('id') _id_: string): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.getUserById(_id_));
  }

  @Get() getAllUsers(): Array<ExternalUserDTO> {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }

  @Post()
  addUser(@Body() _user_: CreateUserDTO): ExternalUserDTO {
    return this.userRepository.addUser(_user_);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDTO,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.updateUser(id, dto));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') _user_: string): void {
    return this.userRepository.deleteUser(_user_);
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return { ...user, dateOfBirth: dateToArray(user.dateOfBirth) };
  }
}
