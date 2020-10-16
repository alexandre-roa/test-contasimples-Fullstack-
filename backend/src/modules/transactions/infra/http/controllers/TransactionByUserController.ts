import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetLastTransactionService from '@modules/transactions/services/GetLastTransactionService';

export default class TransactionByUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const getTransactionDayService = container.resolve(
      GetLastTransactionService,
    );

    const transaction = await getTransactionDayService.execute(user_id);

    return response.json(transaction);
  }
}
