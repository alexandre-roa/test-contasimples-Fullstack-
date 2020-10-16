import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ITransactionsRepository from '../repositories/ITransactionsRepository';

import Transaction from '../infra/typeorm/schemas/Transaction';

@injectable()
class GetTransactionsByType {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(user_id: string, type: string): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.findByType(
      user_id,
      type,
    );

    return transactions;
  }
}

export default GetTransactionsByType;
