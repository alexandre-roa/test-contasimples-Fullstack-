import User from '@modules/users/infra/typeorm/schemas/User';

export default interface ICreateTransactionsDTO {
  title: string;
  type: 'credit' | 'debit';
  value: number;
  final_card: number;
  transaction_date: Date;
  transaction_type: string;
  transaction_description: string;
  establishment: string;
  user_id: string;
}
