import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface IBankData {
  bank_code: number;
  bank_name: string;
  bank_agency_number: number;
  account_number: string;
  digit_account_number: number;
}

import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  full_name: string;

  @Column()
  company_name: string;

  @Column()
  cnpj: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  bank_data: IBankData;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
