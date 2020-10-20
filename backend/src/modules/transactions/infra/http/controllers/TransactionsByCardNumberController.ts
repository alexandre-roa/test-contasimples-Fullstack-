import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetTransactionsByCardNumberService from '@modules/transactions/services/GetTransactionsByCardNumberService';

export default class TransactionsTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id, final_card } = request.params;
    const {} = request.query;

    const getTransactionsByCardNumberService = container.resolve(
      GetTransactionsByCardNumberService,
    );

    const transactions = await getTransactionsByCardNumberService.execute(
      user_id,
      Number(final_card),
    );

    return response.json(transactions);
  }
}
