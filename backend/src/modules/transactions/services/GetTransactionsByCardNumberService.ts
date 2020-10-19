import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ITransactionsRepository from '../repositories/ITransactionsRepository';

import Transaction from '../infra/typeorm/schemas/Transaction';

@injectable()
class GetTransactionsByCardNumber {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(
    user_id: string,
    final_card: number,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.findByCard(
      user_id,
      final_card,
    );

    return transactions;
  }
}

export default GetTransactionsByCardNumber;
