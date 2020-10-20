import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListOneCardService from '@modules/cards/services/ListOneCardService';

export default class TransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id, card_number } = request.params;

    const getCard = container.resolve(ListOneCardService);

    const cardNumber = Number(card_number);

    const card = await getCard.execute(user_id, cardNumber);

    return response.json(card);
  }
}
