import {
  getMongoRepository,
  In,
  EntityRepository,
  MongoRepository,
  Raw,
} from 'typeorm';
import Card from '@modules/cards/infra/typeorm/schemas/Card';

import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';

@EntityRepository(Card)
class CardsRepository implements ICardsRepository {
  private ormRepository: MongoRepository<Card>;

  constructor() {
    this.ormRepository = getMongoRepository(Card);
  }

  public async create(data: Omit<ICreateCardDTO, 'user'>): Promise<Card> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async listOne(user_id: string, card_number: number): Promise<Card> {
    const card = await this.ormRepository.findOne({
      where: { user_id, card_number },
    });

    return card;
  }

  public async listAll(user_id: string): Promise<Card[]> {
    const cards = await this.ormRepository.find({ where: { user_id } });

    return cards;
  }
}

export default CardsRepository;
