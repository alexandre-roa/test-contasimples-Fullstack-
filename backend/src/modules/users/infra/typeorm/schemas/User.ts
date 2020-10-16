import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  OneToMany,
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

import Transaction from '@modules/transactions/infra/typeorm/schemas/Transaction';

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

  @OneToMany(() => Transaction, transaction => transaction.user)
  transaction: Transaction;

  @Exclude()
  @Column()
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
