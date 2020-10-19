import Card from '@modules/cards/infra/typeorm/schemas/Card';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';

export default interface ICardsRepository {
  create(data: ICreateCardDTO): Promise<Card>;
  listOne(user_id: string, card_number: number): Promise<Card>;
  listAll(user_id: string): Promise<Card[]>;
}
