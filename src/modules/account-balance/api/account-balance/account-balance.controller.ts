import { Controller } from '@root/framework/api/controller';
import { RequestHandler, Router } from 'express';
import { addAmountToBalanceActionValidation } from './actions/add-amount-to-balance/add-amount-to-balance.action';
import { getAccountBalanceActionValidation } from './actions/get-account-balance/get-account-balance.action';
import { removeAmountFromBalanceActionValidation } from './actions/remove-amount-from-balance/remove-amount-from-balance.action';

interface Dependencies {
  addAmountToBalanceAction: RequestHandler;
  removeAmountFromBalanceAction: RequestHandler;
  getAccountBalanceAction: RequestHandler;
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

    router.delete('/:id', [
      removeAmountFromBalanceActionValidation,
      this.dependencies.removeAmountFromBalanceAction,
    ]);

    router.get('/:id', [
      getAccountBalanceActionValidation,
      this.dependencies.getAccountBalanceAction,
    ]);

    return router;
  }
}
