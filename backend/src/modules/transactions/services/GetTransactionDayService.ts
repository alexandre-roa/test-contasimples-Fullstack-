import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import ITransactionsRepository from '../repositories/ITransactionsRepository';

import Transaction from '../infra/typeorm/schemas/Transaction';

interface IRequest {
  user_id: string;
  month: number;
  day: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class GetTransactionDayService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    user_id,
    year,
    month,
    day,
  }: IRequest): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.findAllInDayTransaction(
      {
        user_id,
        year,
        month,
        day,
      },
    );

    return transactions;
  }
}

export default GetTransactionDayService;
