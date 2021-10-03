import { CommandBus } from '@root/framework/processing/command-bus';
import { RegisterNewAccountCommand } from '@root/modules/platform-access/app/commands/register-new-account/register-new-account.command';
import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

interface Dependencies {
  commandBus: CommandBus;
}

export const registerNewAccountActionValidation = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      firstName: Joi.string().min(3).trim().required(),
      lastName: Joi.string().min(3).trim().required(),
    }),
  },
  {
    abortEarly: false,
  },
);

/**
 * @swagger
 *
 * /accounts:
 *   post:
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     summary: Create New Account
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                required: true
 *                example: john@gmail.com
 *              firstName:
 *                type: string
 *                required: true
 *                example: John
 *              lastName:
 *                type: string
 *                required: true
 *                example: Doe
 *     responses:
 *       201:
 *        description: Founder account created
 *       422:
 *        description: Validation Error
 *       400:
 *        description: Business rule validation error occurred
 *       500:
 *         description: Internal Server Error
 */
const registerNewAccountAction =
  ({ commandBus }: Dependencies): RequestHandler =>
  (req, res, next) =>
    commandBus
      .handle(new RegisterNewAccountCommand(req.body))
      .then(() => res.sendStatus(201))
      .catch(next);

export default registerNewAccountAction;
