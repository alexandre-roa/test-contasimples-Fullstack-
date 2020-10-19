import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetTransactionsByType from '@modules/transactions/services/GetTransactionsByType';

export default class TransactionsTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { type } = request.query;

    const getTransactionsByType = container.resolve(GetTransactionsByType);

    const transactions = await getTransactionsByType.execute(user_id, type[0]);

    return response.json(transactions);
  }
}
