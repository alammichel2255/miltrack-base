/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('medical', table => {
        table.increments('id');
        table.string('pha_date');
        table.string('dental_date');
        table.string('hearing_date');
        table.string('hiv_date');
        table.string('pdha_date');
        table.string('vision_date');
        table.integer('users_id');
        table.foreign('users_id').references('users.id');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('medical', table => {
        return table.dropForeign('users_id');
      })
      .then(table => {
        return knex.schema.dropTableIfExists('medical');
      })
};
