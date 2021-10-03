/* eslint-disable global-require */
/* eslint-disable import/first */
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import { Logger } from '@tools/logger';
import { Application } from 'express';
import { createAppContainer } from './container/app-container';

(async () => {
  const container = await createAppContainer();

  const app = container.resolve<Application>('app');
  const logger = container.resolve<Logger>('logger');

  const port = process.env.PORT;

  app.listen(port, () => {
    logger.info(`Server listening on ${process.env.PROTOCOL}://${process.env.HOST}:${port}`);
  });
})();
