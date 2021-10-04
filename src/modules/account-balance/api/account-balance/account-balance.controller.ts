import { Controller } from '@root/framework/api/controller';
import { RequestHandler, Router } from 'express';
import { addAmountToBalanceActionValidation } from './actions/add-amount-to-balance/add-amount-to-balance.action';

interface Dependencies {
  addAmountToBalanceAction: RequestHandler;
}

export class AccountBalanceController extends Controller {
  constructor(private readonly dependencies: Dependencies) {
    super('/balances');
  }

  public getRouter() {
    const router = Router();

    router.post('/:id', [
      addAmountToBalanceActionValidation,
      this.dependencies.addAmountToBalanceAction,
    ]);

    return router;
  }
}
