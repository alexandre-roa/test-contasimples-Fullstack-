import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';
import cardsRouter from '@modules/cards/infra/http/routes/cards.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/password', passwordRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/transactions', transactionsRouter);

routes.use('/cards', cardsRouter);

export default routes;
