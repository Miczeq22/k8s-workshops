import { CommandHandler } from '@root/framework/processing/command-handler';
import { TransactionalOperation } from '@root/framework/transactional-operation';
import { AccountRegistration } from '@root/modules/platform-access/core/account-registration.aggregate-root';
import { AccountRegistrationRepository } from '@root/modules/platform-access/core/account-registration.repository';
import { AccountEmailCheckerService } from '@root/modules/shared-kernel/core/account-email/account-email-checker.service';
import {
  RegisterNewAccountCommand,
  REGISTER_NEW_ACCOUNT_COMMAND,
} from './register-new-account.command';

interface Dependencies {
  accountRegistrationRepository: AccountRegistrationRepository;
  performTransactionalOperation: TransactionalOperation;
  accountEmailCheckerService: AccountEmailCheckerService;
}

export class RegisterNewAccountCommandHandler extends CommandHandler<RegisterNewAccountCommand> {
  constructor(private readonly dependencies: Dependencies) {
    super(REGISTER_NEW_ACCOUNT_COMMAND);
  }

  public async handle({ payload }: RegisterNewAccountCommand) {
    const {
      accountRegistrationRepository,
      performTransactionalOperation,
      accountEmailCheckerService,
    } = this.dependencies;

    const accountRegistration = await AccountRegistration.registerNew({
      ...payload,
      accountEmailCheckerService,
    });

    await performTransactionalOperation(
      accountRegistrationRepository.insert.bind(this),
      accountRegistration,
    );
  }
}
