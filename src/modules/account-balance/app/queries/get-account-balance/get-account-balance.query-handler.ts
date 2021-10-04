import { NotFoundError } from '@errors/not-found.error';
import { AvailableDatabaseTable } from '@infrastructure/database/available-tables';
import { QueryBuilder } from '@infrastructure/database/query-builder';
import { QueryHandler } from '@root/framework/processing/query-handler';
import { AccountBalanceDTO } from '@root/modules/account-balance/dtos/account-balance.dto';
import { GetAccountBalanceQuery, GET_ACCOUNT_BALANCE_QUERY } from './get-account-balance.query';

interface Dependencies {
  queryBuilder: QueryBuilder;
}

export class GetAccountBalanceQueryHandler extends QueryHandler<
  GetAccountBalanceQuery,
  AccountBalanceDTO
> {
  constructor(private readonly dependencies: Dependencies) {
    super(GET_ACCOUNT_BALANCE_QUERY);
  }

  public async handle({ payload: { accountId } }: GetAccountBalanceQuery) {
    const { queryBuilder } = this.dependencies;

    const result = await queryBuilder
      .select(['id', 'balance'])
      .where('account_id', accountId)
      .from(AvailableDatabaseTable.AccountBalance)
      .first();

    if (!result) {
      throw new NotFoundError(
        `Account Balance for account with id: "${accountId}" does not exist.`,
      );
    }

    return {
      ...result,
      balance: Number(result.balance),
    };
  }
}
