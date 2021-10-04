import { AggregateRoot } from '@root/framework/ddd-building-blocks/aggregate-root';
import { UniqueEntityID } from '@root/framework/unique-entity-id';
import { AmountMustBePositiveRule } from './rules/amount-must-be-positive.rule';

interface AccountBalanceProps {
  balance: number;
}

interface PersistedAccountBalance {
  id: string;
  balance: number;
}

export class AccountBalance extends AggregateRoot<AccountBalanceProps> {
  private constructor(props: AccountBalanceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ balance, id }: PersistedAccountBalance) {
    return new AccountBalance({ balance }, new UniqueEntityID(id));
  }

  public add(amount: number) {
    AccountBalance.checkRule(new AmountMustBePositiveRule(amount));

    this.props.balance += amount;
  }

  public remove(amount: number) {
    AccountBalance.checkRule(new AmountMustBePositiveRule(amount));

    this.props.balance -= amount;
  }

  public getBalance() {
    return this.props.balance;
  }
}
