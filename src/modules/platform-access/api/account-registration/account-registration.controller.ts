import { Controller } from '@root/framework/api/controller';
import { RequestHandler, Router } from 'express';
import { registerNewAccountActionValidation } from './actions/register-new-account/register-new-account.action';

interface Dependencies {
  registerNewAccountAction: RequestHandler;
}

export class AccountRegistrationController extends Controller {
  constructor(private readonly dependencies: Dependencies) {
    super('/accounts');
  }

  public getRouter() {
    const router = Router();

    router.post('/', [
      registerNewAccountActionValidation,
      this.dependencies.registerNewAccountAction,
    ]);

    return router;
  }
}
