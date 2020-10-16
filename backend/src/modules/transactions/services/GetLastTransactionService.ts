import { inject, injectable } from 'tsyringe';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

import Transaction from '../infra/typeorm/schemas/Transaction';

@injectable()
class GetLastTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(user_id: string): Promise<Transaction> {
    const transactions = await this.transactionsRepository.findById(user_id);

    const lastIndex = transactions.length - 1;

    const transaction = transactions[lastIndex];

    return transaction;
  }
}

export default GetLastTransactionService;
