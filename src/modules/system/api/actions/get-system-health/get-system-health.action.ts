import { QueryBuilder } from '@infrastructure/database/query-builder';
import { SystemIsUnhealthyError } from '@root/modules/system/errors/system-is-unhealthy.error';
import { RequestHandler } from 'express';

interface Dependencies {
  queryBuilder: QueryBuilder;
}

/**
 * @swagger
 *
 * /system/health:
 *   get:
 *     tags:
 *       - System
 *     security:
 *       - bearerAuth: []
 *     summary: Checks system health
 *     responses:
 *       200:
 *        description: System is healthy
 *       503:
 *         description: System is unhealthy
 */
const getSystemHealthAction =
  ({ queryBuilder }: Dependencies): RequestHandler =>
  async (_, res, next) => {
    try {
      await queryBuilder.raw('SELECT 1');

      return res.sendStatus(200);
    } catch (error) {
      next(new SystemIsUnhealthyError());
    }
  };

export default getSystemHealthAction;
