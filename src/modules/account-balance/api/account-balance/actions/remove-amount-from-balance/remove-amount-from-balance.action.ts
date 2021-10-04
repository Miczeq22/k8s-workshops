import { CommandBus } from '@root/framework/processing/command-bus';
import { RemoveAmountFromBalanceCommand } from '@root/modules/account-balance/app/commands/remove-amount-from-balance/remove-amount-from-balance.command';
import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

interface Dependencies {
  commandBus: CommandBus;
}

export const removeAmountFromBalanceActionValidation = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.number().integer().required(),
    }),
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

/**
 * @swagger
 *
 * /balances/{accountId}:
 *   delete:
 *     tags:
 *       - Account Balances
 *     security:
 *       - bearerAuth: []
 *     summary: Remove Amount from Account Balance
 *     parameters:
 *      - in: path
 *        name: accountId
 *        schema:
 *         type: string
 *         format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              amount:
 *                type: number
 *                required: true
 *                example: 100
 *     responses:
 *       200:
 *        description: Amount removed succesfuly
 *       404:
 *        description: Account Balance does not exist
 *       422:
 *        description: Validation Error
 *       400:
 *        description: Business rule validation error occurred
 *       500:
 *         description: Internal Server Error
 */
const removeAmountFromBalanceAction =
  ({ commandBus }: Dependencies): RequestHandler =>
  (req, res, next) =>
    commandBus
      .handle(
        new RemoveAmountFromBalanceCommand({
          accountId: req.params.id,
          amount: req.body.amount,
        }),
      )
      .then((balance) => res.status(200).json(balance))
      .catch(next);

export default removeAmountFromBalanceAction;
