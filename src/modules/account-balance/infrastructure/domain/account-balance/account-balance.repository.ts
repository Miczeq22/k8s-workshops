import { AvailableDatabaseTable } from '@infrastructure/database/available-tables';
import { QueryBuilder } from '@infrastructure/database/query-builder';
import { AccountBalance } from '@root/modules/account-balance/core/account-balance/account-balance.aggregate-root';
import { AccountBalanceRepository } from '@root/modules/account-balance/core/account-balance/account-balance.repository';

interface Dependencies {
  queryBuilder: QueryBuilder;
}

export class AccountBalanceRepositoryImpl implements AccountBalanceRepository {
  constructor(private readonly dependencies: Dependencies) {}

  public async findByAccountId(accountId: string) {
    const { queryBuilder } = this.dependencies;

    const result = await queryBuilder
      .select(['id', 'balance'])
      .from(AvailableDatabaseTable.AccountBalance)
      .where('account_id', accountId)
      .first();

    return result
      ? AccountBalance.fromPersistence({
          id: result.id,
          balance: Number(result.balance),
        })
      : null;
  }

  public async update(accountBalance: AccountBalance) {
    const trx = await this.dependencies.queryBuilder.transaction();

    await trx
      .update({
        balance: accountBalance.getBalance(),
      })
      .where('id', accountBalance.getId().getValue())
      .into(AvailableDatabaseTable.AccountBalance);

    return trx;
  }
}
