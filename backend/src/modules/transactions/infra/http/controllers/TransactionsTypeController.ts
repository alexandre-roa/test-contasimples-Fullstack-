import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetTransactionsByType from '@modules/transactions/services/GetTransactionsByType';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { type } = request.query;

    const listProviderDayAvailability = container.resolve(
      GetTransactionsByType,
    );

    const transactions = await listProviderDayAvailability.execute(
      user_id,
      type[0],
    );

    return response.json(transactions);
  }
}
