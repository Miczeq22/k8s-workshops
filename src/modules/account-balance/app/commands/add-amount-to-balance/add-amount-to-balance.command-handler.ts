import { NotFoundError } from '@errors/not-found.error';
import { CommandHandler } from '@root/framework/processing/command-handler';
import { TransactionalOperation } from '@root/framework/transactional-operation';
import { AccountBalanceRepository } from '@root/modules/account-balance/core/account-balance/account-balance.repository';
import { accountBalanceToAccountBalanceDTO } from '@root/modules/account-balance/dtos/account-balance.dto';
import {
  AddAmountToBalanceCommand,
  ADD_AMOUNT_TO_BALANCE_COMMAND,
} from './add-amount-to-balance.command';

interface Dependencies {
  accountBalanceRepository: AccountBalanceRepository;
  performTransactionalOperation: TransactionalOperation;
}

export class AddAmountToBalanceCommandHandler extends CommandHandler<AddAmountToBalanceCommand> {
  constructor(private readonly dependencies: Dependencies) {
    super(ADD_AMOUNT_TO_BALANCE_COMMAND);
  }

  public async handle({ payload: { accountId, amount } }: AddAmountToBalanceCommand) {
    const { accountBalanceRepository, performTransactionalOperation } = this.dependencies;

    const accountBalance = await accountBalanceRepository.findByAccountId(accountId);

    if (!accountBalance) {
      throw new NotFoundError(
        `Account Balance for account with id: "${accountId}" does not exist.`,
      );
    }

    accountBalance.add(amount);

    await performTransactionalOperation(accountBalanceRepository.update.bind(this), accountBalance);

    return accountBalanceToAccountBalanceDTO(accountBalance);
  }
}
