/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('evaluations', table => {
        table.increments('id');
        table.string('eval_name');
        table.string('eval_date');
        table.string('eval_type')
        table.integer('users_id');
        table.foreign('users_id').references('users.id');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('evaluations', table => {
        return table.dropForeign('users_id');
      })
      .then(table => {
        return knex.schema.dropTableIfExists('evaluations');
      })
};
