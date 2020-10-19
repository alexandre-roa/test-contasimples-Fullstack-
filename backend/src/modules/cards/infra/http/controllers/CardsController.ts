import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateCardService from '@modules/cards/services/CreateCardService';
import ListAllCardsService from '@modules/cards/services/ListAllCardsService';

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const {
      label_name,
      card_limit,
      card_number,
      final_card_number,
      due_date,
      status,
      cvv,
    } = request.body;

    const createCard = container.resolve(CreateCardService);

    const card = await createCard.execute({
      label_name,
      card_limit,
      card_number,
      final_card_number,
      due_date,
      status,
      cvv,
      user_id,
    });

    return response.json(card);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const getCards = container.resolve(ListAllCardsService);

    const cards = await getCards.execute(user_id);

    return response.json(cards);
  }
}
