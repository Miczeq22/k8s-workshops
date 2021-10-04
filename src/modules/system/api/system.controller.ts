import { Controller } from '@root/framework/api/controller';
import { RequestHandler, Router } from 'express';

interface Dependencies {
  getSystemHealthAction: RequestHandler;
}

export class SystemController extends Controller {
  constructor(private readonly dependencies: Dependencies) {
    super('/system');
  }

  public getRouter() {
    const router = Router();

    router.get('/health', [this.dependencies.getSystemHealthAction]);

    return router;
  }
}
