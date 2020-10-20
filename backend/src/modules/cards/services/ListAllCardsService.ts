import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import format from '@config/format';

import Card from '@modules/cards/infra/typeorm/schemas/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Transaction from '@modules/transactions/infra/typeorm/schemas/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(user_id: string): Promise<Card[] | null> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const cards = await this.cardsRepository.listAll(
      (user_id = format.ObjectIDToId(user.id)),
    );

    // const transactions = await this.transactionsRepository.findByCard(user_id);

    const cardsWithTransactions = Promise.all(
      cards.map(async card => ({
        ...card,
        transactions: await this.transactionsRepository.findByCard(
          user_id,
          card.final_card_number,
        ),
      })),
    );

    return cardsWithTransactions;
  }
}

export default CreateTransactionService;
