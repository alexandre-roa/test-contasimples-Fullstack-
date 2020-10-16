import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UserBalanceController from '../controllers/UserBalanceController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userBalanceController = new UserBalanceController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      full_name: Joi.string().required(),
      company_name: Joi.string().required(),
      cnpj: Joi.number().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.use(ensureAuthenticated);

usersRouter.get(
  '/balance/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().id().required(),
    },
  }),
  userBalanceController.index,
);

export default usersRouter;
