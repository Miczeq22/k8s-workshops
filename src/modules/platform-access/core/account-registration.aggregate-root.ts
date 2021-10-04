import { AggregateRoot } from '@root/framework/ddd-building-blocks/aggregate-root';
import { UniqueEntityID } from '@root/framework/unique-entity-id';
import { AccountEmailCheckerService } from '@root/modules/shared-kernel/core/account-email/account-email-checker.service';
import { AccountEmail } from '@root/modules/shared-kernel/core/account-email/account-email.value-object';
import { RegisterNewAccountDTO } from '../dtos/register-new-account.dto';
import { NewAccountRegisteredEvent } from './events/new-account-registered.event';

interface AccountRegistrationProps {
  email: AccountEmail;
  firstName: string;
  lastName: string;
  registeredAt: Date;
}

export class AccountRegistration extends AggregateRoot<AccountRegistrationProps> {
  private constructor(props: AccountRegistrationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static async registerNew({
    email,
    accountEmailCheckerService,
    ...payload
  }: RegisterNewAccountDTO & { accountEmailCheckerService: AccountEmailCheckerService }) {
    const accountRegistration = new AccountRegistration({
      email: await AccountEmail.createNew(email, accountEmailCheckerService),
      registeredAt: new Date(),
      ...payload,
    });

    accountRegistration.addDomainEvent(
      new NewAccountRegisteredEvent({
        accountId: accountRegistration.getId().getValue(),
      }),
    );

    return accountRegistration;
  }

  public getEmail() {
    return this.props.email.toString();
  }

  public getFirstName() {
    return this.props.firstName;
  }

  public getLastName() {
    return this.props.lastName;
  }

  public getRegisteredAt() {
    return this.props.registeredAt;
  }
}
