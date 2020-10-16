import { inject, injectable } from 'tsyringe';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

import Transaction from '../infra/typeorm/schemas/Transaction';

@injectable()
class GetAllTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(user_id: string): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.findAll(user_id);

    return transactions;
  }
}

export default GetAllTransactionService;
