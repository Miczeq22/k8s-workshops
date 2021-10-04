import { BusinessRule } from '@root/framework/ddd-building-blocks/business-rule';

export class AmountMustBePositiveRule extends BusinessRule {
  message = 'Amount must be positive and greater than zero.';

  constructor(private readonly amount: number) {
    super();
  }

  public isBroken() {
    return this.amount <= 0;
  }
}
