import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/schemas/User';

interface IRequest {
  full_name: string;
  company_name: string;
  cnpj: number;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    full_name,
    company_name,
    cnpj,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByCnpj(cnpj);

    if (checkUserExists) {
      throw new AppError('Cnpj address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      full_name,
      company_name,
      cnpj,
      email,
      password: hashedPassword,
    });

    const generateAccountNumber = (): string => {
      const minimum = 0;
      const maximum = 999999;

      let random = Math.random() * (maximum - minimum) + minimum;

      return random.toFixed(0);
    };

    user.bank_data = {
      bank_code: 999,
      bank_name: 'CONTA SIMPLES',
      bank_agency_number: 1,
      account_number: generateAccountNumber(),
      digit_account_number: 1,
    };

    user.balance = 10000;

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
