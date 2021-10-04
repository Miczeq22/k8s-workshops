import { AccountBalance } from '../account-balance/core/account-balance/account-balance.aggregate-root';

export interface AccountBalanceDTO {
  id: string;
  balance: number;
}

export const accountBalanceToAccountBalanceDTO = (
  accountBalance: AccountBalance,
): AccountBalanceDTO => ({
  id: accountBalance.getId().getValue(),
  balance: accountBalance.getBalance(),
});
