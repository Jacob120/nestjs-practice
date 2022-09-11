import { Roles } from 'src/shared/enums/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { UserAddress } from './users-addresses.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfBirth: Date;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles[];

  @OneToMany((type) => UserAddress, (address) => address.user)
  address?: UserAddress[];
}
