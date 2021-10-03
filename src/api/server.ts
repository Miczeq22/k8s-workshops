import { NotFoundError } from '@errors/not-found.error';
import { Controller } from '@root/framework/api/controller';
import { Logger } from '@tools/logger';
import express, { Application } from 'express';
import { errorHandlerMiddleware } from './middlewares/error-handler/error-handler.middleware';

interface Dependencies {
  controllers: Controller[];
  logger: Logger;
}

export class Server {
  private app: Application;

  constructor(private readonly dependencies: Dependencies) {
    this.app = express();

    this.app.use(express.json());

    this.initRoutes();
  }

  private initRoutes() {
    this.dependencies.controllers.forEach((controller) =>
      this.app.use(controller.route, controller.getRouter()),
    );

    this.app.use('*', (req, __, next) =>
      next(new NotFoundError(`Route "${req.originalUrl}" not found.`)),
    );

    this.app.use(errorHandlerMiddleware(this.dependencies.logger));
  }

  public getApp() {
    return this.app;
  }
}
