import { DatabaseTransaction } from '@infrastructure/database/database-transaction';
import { AccountBalance } from './account-balance.aggregate-root';

export interface AccountBalanceRepository {
  findByAccountId(accountId: string): Promise<AccountBalance | null>;

  update(accountBalance: AccountBalance): Promise<DatabaseTransaction>;
}
