import { DomainEvent } from '@root/framework/ddd-building-blocks/domain-event';

export interface NewAccountRegisteredEventPayload {
  accountId: string;
}

export const NEW_ACCOUNT_REGISTERED_EVENT = 'platform-access/new-account-registered';

export class NewAccountRegisteredEvent extends DomainEvent<NewAccountRegisteredEventPayload> {
  constructor(payload: NewAccountRegisteredEventPayload) {
    super(NEW_ACCOUNT_REGISTERED_EVENT, payload);
  }
}
