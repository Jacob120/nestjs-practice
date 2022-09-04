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

export class UpdateUserDTO {
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
  @Type(() => UpdateUserDTO)
  address?: Array<UpdateUserAddressDTO>;

  @IsEnum(Roles)
  role: Roles[];
}

export class UpdateUserAddressDTO {
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
