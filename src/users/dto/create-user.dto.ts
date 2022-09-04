import { Roles } from '../enums/roles.enum';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { arrayToDate } from '../../shared/helper/date.helper';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform((d) => arrayToDate(d))
  dateOfBirth: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateUserDTO)
  address?: Array<CreateUserAddressDTO>;

  @IsEnum(Roles)
  role: Roles[];
}

export class CreateUserAddressDTO {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
}
