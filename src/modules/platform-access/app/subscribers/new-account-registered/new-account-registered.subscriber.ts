import { AvailableDatabaseTable } from '@infrastructure/database/available-tables';
import { DatabaseTransaction } from '@infrastructure/database/database-transaction';
import { DomainEvents } from '@infrastructure/message-queue/in-memory/in-memory-message-queue.service';
import { DomainSubscriber } from '@root/framework/ddd-building-blocks/domain-subscriber';
import { UniqueEntityID } from '@root/framework/unique-entity-id';
import {
  NewAccountRegisteredEventPayload,
  NEW_ACCOUNT_REGISTERED_EVENT,
} from '@root/modules/platform-access/core/events/new-account-registered.event';

export class NewAccountRegisteredSubscriber extends DomainSubscriber<NewAccountRegisteredEventPayload> {
  constructor() {
    super(NEW_ACCOUNT_REGISTERED_EVENT);
  }

  public setup() {
    DomainEvents.register(this.insertAccountBalanceToDatabase.bind(this), this.name);
  }

  private async insertAccountBalanceToDatabase(
    { accountId }: NewAccountRegisteredEventPayload,
    trx: DatabaseTransaction,
  ) {
    await trx
      .insert({
        id: new UniqueEntityID().getValue(),
        account_id: accountId,
        balance: 0,
      })
      .into(AvailableDatabaseTable.AccountBalance);
  }
}
