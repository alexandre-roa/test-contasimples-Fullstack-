import {
  getMongoRepository,
  In,
  EntityRepository,
  MongoRepository,
} from 'typeorm';
import Transaction from '@modules/transactions/infra/typeorm/schemas/Transaction';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';
import ICreateTransactionsDTO from '@modules/transactions/dtos/ICreateTransactionsDTO';

@EntityRepository(Transaction)
class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: MongoRepository<Transaction>;

  constructor() {
    this.ormRepository = getMongoRepository(Transaction);
  }

  public async getBalance(
    user_id: string,
    user_balance: number,
  ): Promise<IBalance> {
    const transactions = await this.ormRepository.find({ where: { user_id } });

    const { credit, debit } = transactions.reduce(
      (acc, cur) => {
        switch (cur.type) {
          case 'credit':
            acc.credit += cur.value;
            break;
          case 'debit':
            acc.debit += cur.value;
            break;
          default:
            break;
        }

        return acc;
      },
      {
        credit: 0,
        debit: 0,
        user_balance: 0,
      },
    );
    user_balance = credit - debit;

    const total = user_balance;

    return { credit, debit, total };
  }

  public async create(
    data: Omit<ICreateTransactionsDTO, 'user'>,
  ): Promise<Transaction> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async findAll(user_id: string): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({ where: { user_id } });

    return transactions;
  }

  public async findById(
    user_id: string,
    transaction_id: string,
  ): Promise<Transaction[]> {
    const transaction = await this.ormRepository.find({ where: { user_id } });

    return transaction;
  }
}

export default TransactionsRepository;
