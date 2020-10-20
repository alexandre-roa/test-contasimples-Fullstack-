import {
  Entity,
  ObjectIdColumn,
  Column,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/schemas/User';
import Card from '@modules/cards/infra/typeorm/schemas/Card';

@Entity('transactions')
class Transaction {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  type: 'credit' | 'debit';

  @ObjectIdColumn()
  user_id: string;

  @ObjectIdColumn()
  card_id: string;

  @Column()
  final_card: number;

  @Column()
  transaction_type: string;

  @Column()
  transaction_description: string;

  @Column()
  establishment: string;

  @Column('timestamp with time zone')
  transaction_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.transaction, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Card, card => card.transactions, {
    eager: true,
  })
  @JoinColumn({ name: 'card_id' })
  card: Card;
}

export default Transaction;
