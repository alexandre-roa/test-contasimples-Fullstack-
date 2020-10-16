import Transaction from '@modules/transactions/infra/typeorm/schemas/Transaction';
import IBalanceDTO from '@modules/transactions/dtos/IBalanceDTO';
import ICreateTransactionsDTO from '../dtos/ICreateTransactionsDTO';
import IFindAllInDayTransactionDTO from '../dtos/IFindAllInDayTransactionDTO';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionsDTO): Promise<Transaction>;
  getBalance(user_id: string, user_balance: number): Promise<IBalanceDTO>;
  findAll(user_id: string): Promise<Transaction[]>;
  findById(user_id: string, transaction_id: string): Promise<Transaction[]>;
  findAllInDayTransaction(
    data: IFindAllInDayTransactionDTO,
  ): Promise<Transaction[]>;
  findByType(user_id: string, type: string): Promise<Transaction[]>;
}
