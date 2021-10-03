import { Server } from '@api/server';
import { Controller } from '@root/framework/api/controller';
import { CommandBus } from '@root/framework/processing/command-bus';
import { CommandHandler } from '@root/framework/processing/command-handler';
import { QueryBus } from '@root/framework/processing/query-bus';
import { QueryHandler } from '@root/framework/processing/query-handler';
import { logger } from '@tools/logger';
import {
  asClass,
  asFunction,
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
  Lifetime,
} from 'awilix';
import { registerAsArray } from './register-as-array';

export const createAppContainer = async (): Promise<AwilixContainer> => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  container.register({
    logger: asValue(logger),
    commandBus: asClass(CommandBus).singleton(),
    queryBus: asClass(QueryBus).singleton(),
  });

  container.loadModules(
    process.env.NODE_ENV === 'production'
      ? ['dist/**/**/**/**/**/*.action.js']
      : ['src/**/**/**/**/**/*.action.ts'],
    {
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SCOPED,
        register: asFunction,
      },
    },
  );

  container.register({
    controllers: registerAsArray<Controller>([]),
  });

  container.register({});

  container.register({
    commandHandlers: registerAsArray<CommandHandler<any>>([]),
  });

  container.register({
    queryHandlers: registerAsArray<QueryHandler<any, any>>([]),
  });

  container.register({
    server: asClass(Server).singleton(),
  });

  const server = container.resolve<Server>('server');

  container.register({
    app: asValue(server.getApp()),
  });

  return container;
};
