/* eslint-disable unicorn/filename-case */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('account_balance', (table) => {
    table.uuid('id').notNullable().primary();
    table.uuid('account_id').notNullable();
    table.bigInteger('balance').notNullable();

    table.foreign('account_id').references('id').inTable('account');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('account_balance').then((exists) => {
    if (exists) {
      return knex.schema.dropTable('account_balance');
    }
  });
}
