/* eslint-disable unicorn/filename-case */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('account', (table) => {
    table.uuid('id').notNullable().primary();
    table.string('email').notNullable();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.timestamp('registered_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('account').then((exists) => {
    if (exists) {
      return knex.schema.dropTable('account');
    }
  });
}
