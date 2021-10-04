import { QueryBus } from '@root/framework/processing/query-bus';
import { GetAccountBalanceQuery } from '@root/modules/account-balance/app/queries/get-account-balance/get-account-balance.query';
import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

interface Dependencies {
  queryBus: QueryBus;
}

export const getAccountBalanceActionValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

/**
 * @swagger
 *
 * /balances/{accountId}:
 *   get:
 *     tags:
 *       - Account Balances
 *     security:
 *       - bearerAuth: []
 *     summary: Add Amount to Account Balance
 *     parameters:
 *      - in: path
 *        name: accountId
 *        schema:
 *         type: string
 *         format: uuid
 *         required: true
 *     responses:
 *       200:
 *        description: Balance returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  format: uuid
 *                balance:
 *                  type: number
 *                  example: 100
 *       404:
 *        description: Account Balance does not exist
 *       422:
 *        description: Validation Error
 *       400:
 *        description: Business rule validation error occurred
 *       500:
 *         description: Internal Server Error
 */
const getAccountBalanceAction =
  ({ queryBus }: Dependencies): RequestHandler =>
  (req, res, next) =>
    queryBus
      .handle(new GetAccountBalanceQuery(req.params.id))
      .then((balance) => res.status(200).json(balance))
      .catch(next);

export default getAccountBalanceAction;
