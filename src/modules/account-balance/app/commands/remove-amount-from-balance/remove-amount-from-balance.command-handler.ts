import { NotFoundError } from '@errors/not-found.error';
import { CommandHandler } from '@root/framework/processing/command-handler';
import { TransactionalOperation } from '@root/framework/transactional-operation';
import { AccountBalanceRepository } from '@root/modules/account-balance/core/account-balance/account-balance.repository';
import { accountBalanceToAccountBalanceDTO } from '@root/modules/account-balance/dtos/account-balance.dto';
import {
  RemoveAmountFromBalanceCommand,
  REMOVE_AMOUNT_FROM_BALANCE_COMMAND,
} from './remove-amount-from-balance.command';

interface Dependencies {
  accountBalanceRepository: AccountBalanceRepository;
  performTransactionalOperation: TransactionalOperation;
}

export class RemoveAmountFromBalanceCommandHandler extends CommandHandler<RemoveAmountFromBalanceCommand> {
  constructor(private readonly dependencies: Dependencies) {
    super(REMOVE_AMOUNT_FROM_BALANCE_COMMAND);
  }

  public async handle({ payload: { accountId, amount } }: RemoveAmountFromBalanceCommand) {
    const { accountBalanceRepository, performTransactionalOperation } = this.dependencies;

    const accountBalance = await accountBalanceRepository.findByAccountId(accountId);

    if (!accountBalance) {
      throw new NotFoundError(
        `Account Balance for account with id: "${accountId}" does not exist.`,
      );
    }

    accountBalance.remove(amount);

    await performTransactionalOperation(accountBalanceRepository.update.bind(this), accountBalance);

    return accountBalanceToAccountBalanceDTO(accountBalance);
  }
}
