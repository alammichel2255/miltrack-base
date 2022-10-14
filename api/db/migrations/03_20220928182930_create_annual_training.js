/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('annual_training', table => {
        table.increments('id');
        table.string('training_name');
        table.string('training_date');
        table.integer('users_id');
        table.foreign('users_id').references('users.id');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('annual_training', table => {
        return table.dropForeign('users_id');
      })
      .then(table => {
        return knex.schema.dropTableIfExists('annual_training');
      })
};
