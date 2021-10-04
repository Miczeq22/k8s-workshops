import { Query } from '@root/framework/processing/query';

interface Payload {
  accountId: string;
}

export const GET_ACCOUNT_BALANCE_QUERY = 'account-balance/get-account-balance';

export class GetAccountBalanceQuery extends Query<Payload> {
  constructor(accountId: string) {
    super(GET_ACCOUNT_BALANCE_QUERY, { accountId });
  }
}
