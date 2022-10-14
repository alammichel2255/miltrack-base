/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('additional', table => {
        table.increments('id');
        table.string('additional_name');
        table.integer('users_id');
        table.foreign('users_id').references('users.id');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('additional', table => {
        return table.dropForeign('users_id');
      })
      .then(table => {
        return knex.schema.dropTableIfExists('additional');
      })
};
