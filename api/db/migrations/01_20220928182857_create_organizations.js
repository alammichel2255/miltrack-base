/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('organization', table => {
        table.increments('id');
        table.string('organization_name');
        table.string('UIC');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('organization')
    .then(knex.schema.dropTableIfExists('knex_migrations'))
    .then(knex.schema.dropTableIfExists('knex_migrations_lock'))
};
