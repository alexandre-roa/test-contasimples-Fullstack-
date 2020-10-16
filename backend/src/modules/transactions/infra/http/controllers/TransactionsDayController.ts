import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetTransactionDayService from '@modules/transactions/services/GetTransactionDayService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvailability = container.resolve(
      GetTransactionDayService,
    );

    const transactions = await listProviderDayAvailability.execute({
      user_id,
      day: Number(day[0]),
      month: Number(month[0]),
      year: Number(year[0]),
    });

    return response.json(transactions);
  }
}
