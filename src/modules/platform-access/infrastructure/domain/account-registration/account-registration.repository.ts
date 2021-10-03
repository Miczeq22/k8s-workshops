import { AvailableDatabaseTable } from '@infrastructure/database/available-tables';
import { QueryBuilder } from '@infrastructure/database/query-builder';
import { AccountRegistration } from '@root/modules/platform-access/core/account-registration.aggregate-root';
import { AccountRegistrationRepository } from '@root/modules/platform-access/core/account-registration.repository';

interface Dependencies {
  queryBuilder: QueryBuilder;
}

export class AccountRegistrationRepositoryImpl implements AccountRegistrationRepository {
  constructor(private readonly dependencies: Dependencies) {}

  public async insert(accountRegistration: AccountRegistration) {
    const trx = await this.dependencies.queryBuilder.transaction();

    await trx
      .insert({
        id: accountRegistration.getId().getValue(),
        email: accountRegistration.getEmail(),
        first_name: accountRegistration.getFirstName(),
        last_name: accountRegistration.getLastName(),
        registered_at: accountRegistration.getRegisteredAt().toISOString(),
      })
      .into(AvailableDatabaseTable.AccountRegistration);

    return trx;
  }
}
