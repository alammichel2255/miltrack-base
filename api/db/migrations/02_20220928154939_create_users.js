/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username');
    table.string('name');
    table.string('password');
    table.string('rank');
    table.string('MOS');
    table.string('email')
    table.integer('supervisor_id').nullable()
    table.string('current_status');
    table.string('DOB');
    table.string('BASD');
    table.string('DoDID');
    table.integer('organization_id')
    table.foreign('organization_id').references('organization.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users', table => {
    return table.dropForeign('organization_id');
  })
  .then(table => {
    return knex.schema.dropTableIfExists('users');
  })
};
