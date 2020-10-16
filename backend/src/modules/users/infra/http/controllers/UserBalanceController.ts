import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetUserService from '@modules/users/services/GetUserService';

export default class UserBalanceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const createUser = container.resolve(GetUserService);

    const user = await createUser.execute(user_id);

    return response.json({
      user_id: user.id,
      user: user.full_name,
      company: user.company_name,
      cnpj: user.cnpj,
      balance: user.balance,
    });
  }
}
