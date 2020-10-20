import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardsController from '../controllers/CardsController';
import OneCardController from '../controllers/OneCardController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const cardsController = new CardsController();
const oneCardController = new OneCardController();

usersRouter.post(
  '/:user_id',
  celebrate({
    [Segments.BODY]: {
      label_name: Joi.string().required(),
      status: Joi.string().required(),
      card_limit: Joi.number().required(),
      card_number: Joi.number().required(),
      final_card_number: Joi.number().required(),
      due_date: Joi.date().required(),
      cvv: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      user_id: Joi.string().id().required(),
    },
  }),
  cardsController.create,
);

usersRouter.use(ensureAuthenticated);

usersRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().id().required(),
    },
  }),
  cardsController.index,
);

usersRouter.get(
  '/:user_id/:card_number',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().id().required(),
      card_number: Joi.number().required(),
    },
  }),
  oneCardController.index,
);

export default usersRouter;
