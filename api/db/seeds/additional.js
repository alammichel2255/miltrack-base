/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('additional').del()
  await knex('additional').insert([
    {additional_name: 'EFMP', users_id: 1},
    {additional_name: 'EFMP', users_id: 2},
    {additional_name: 'Weapons_Qual', users_id:3}
  ]);
};
