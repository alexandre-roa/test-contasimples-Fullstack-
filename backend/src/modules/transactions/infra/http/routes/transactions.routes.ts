import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TransactionsController from '../controllers/TransactionsController';
import TransactionsDayController from '../controllers/TransactionsDayController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();
const rransactionsDayController = new TransactionsDayController();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.get('/', transactionsController.index);

transactionsRouter.post(
  '/create/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().id().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      establishment: Joi.string().required(),
      value: Joi.number().required(),
      final_card: Joi.number().required(),
      transaction_date: Joi.date().required(),
      transaction_description: Joi.string().required(),
      transaction_type: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  transactionsController.create,
);

transactionsRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().id().required(),
    },
  }),
  transactionsController.index,
);

transactionsRouter.get(
  '/:user_id/day-transactions',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().id().required(),
    },
  }),
  rransactionsDayController.index,
);

export default transactionsRouter;
