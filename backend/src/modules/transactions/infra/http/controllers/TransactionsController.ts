import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import GetTransactionService from '@modules/transactions/services/GetAllTransactionService';

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const {
      title,
      establishment,
      value,
      final_card,
      transaction_description,
      transaction_type,
      type,
    } = request.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      title,
      establishment,
      value,
      final_card,
      transaction_description,
      transaction_type,
      type,
      user_id,
    });

    return response.json(transaction);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const getTransactions = container.resolve(GetTransactionService);

    const transactions = await getTransactions.execute(user_id);

    return response.json(transactions);
  }
}
