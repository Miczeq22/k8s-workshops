import { Server } from '@api/server';
import { postgresQueryBuilder } from '@infrastructure/database/query-builder';
import { Controller } from '@root/framework/api/controller';
import { CommandBus } from '@root/framework/processing/command-bus';
import { CommandHandler } from '@root/framework/processing/command-handler';
import { QueryBus } from '@root/framework/processing/query-bus';
import { QueryHandler } from '@root/framework/processing/query-handler';
import { performTransactionalOperation } from '@root/framework/transactional-operation';
import { AccountRegistrationController } from '@root/modules/platform-access/api/account-registration/account-registration.controller';
import { RegisterNewAccountCommandHandler } from '@root/modules/platform-access/app/commands/register-new-account/register-new-account.command-handler';
import { AccountRegistrationRepositoryImpl } from '@root/modules/platform-access/infrastructure/domain/account-registration/account-registration.repository';
import { AccountEmailCheckerServiceImpl } from '@root/modules/shared-kernel/infrastructure/domain/account-email-checker/account-email-checker.service';
import { PasswordHashProviderServiceImpl } from '@root/modules/shared-kernel/infrastructure/domain/password-hash-provider/password-hash-provider.service';
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
    accountEmailCheckerService: asClass(AccountEmailCheckerServiceImpl).singleton(),
    passwordHashProviderService: asClass(PasswordHashProviderServiceImpl).singleton(),
    performTransactionalOperation: asFunction(performTransactionalOperation).scoped(),
    queryBuilder: asFunction(postgresQueryBuilder),
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
    controllers: registerAsArray<Controller>([asClass(AccountRegistrationController).singleton()]),
  });

  container.register({
    accountRegistrationRepository: asClass(AccountRegistrationRepositoryImpl).singleton(),
  });

  container.register({
    commandHandlers: registerAsArray<CommandHandler<any>>([
      asClass(RegisterNewAccountCommandHandler).singleton(),
    ]),
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
