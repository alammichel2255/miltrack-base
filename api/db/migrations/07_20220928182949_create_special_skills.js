/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('special_skills', table => {
        table.increments('id');
        table.string('skill_name');
        table.string('skill_refresh_date');
        table.integer('users_id');
        table.foreign('users_id').references('users.id');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('special_skills', table => {
        return table.dropForeign('users_id');
      })
      .then(table => {
        return knex.schema.dropTableIfExists('special_skills');
      })
};
