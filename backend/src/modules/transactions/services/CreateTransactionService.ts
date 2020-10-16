import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import format from '@config/format';

import Transaction from '@modules/transactions/infra/typeorm/schemas/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICreateTransactionsDTO from '@modules/transactions/dtos/ICreateTransactionsDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    title,
    establishment,
    value,
    final_card,
    transaction_description,
    transaction_type,
    type,
    transaction_date,
    user_id,
  }: Omit<ICreateTransactionsDTO, 'user'>): Promise<Transaction | null> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    if (!['credit', 'debit'].includes(type)) {
      throw new Error('Transaction type is invalid');
    }

    if (type === 'debit' && user.balance < value) {
      throw new AppError('You do not have enough balance', 400);
    }

    const transaction = await this.transactionsRepository.create({
      title,
      establishment,
      value,
      final_card,
      transaction_date,
      transaction_description,
      transaction_type,
      type,
      user_id: format.ObjectIDToId(user.id),
    });

    const { total } = await this.transactionsRepository.getBalance(
      user_id,
      user.balance,
    );

    await this.usersRepository.updateBalance(user_id, total);

    return transaction;
  }
}

export default CreateTransactionService;
