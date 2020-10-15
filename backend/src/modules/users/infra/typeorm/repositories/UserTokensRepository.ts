import { getMongoRepository, MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../schemas/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: MongoRepository<UserToken>;

  constructor() {
    this.ormRepository = getMongoRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const token = uuid();
    const userToken = this.ormRepository.create({
      user_id,
      token,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
