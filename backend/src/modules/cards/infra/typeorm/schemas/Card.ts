import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Transaction from '@modules/transactions/infra/typeorm/schemas/Transaction';
import User from '@modules/users/infra/typeorm/schemas/User';

@Entity('cards')
class Card {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  label_name: string;

  @Column()
  card_limit: number;

  @Column()
  card_number: number;

  @Column()
  final_card_number: number;

  @Column()
  due_date: Date;

  @Column()
  status: string;

  @Column()
  @Exclude()
  cvv: number;

  @ObjectIdColumn()
  user_id: string;

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @ManyToOne(() => User, user => user.transaction, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Card;
