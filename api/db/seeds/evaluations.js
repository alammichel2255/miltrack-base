/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('evaluations').del()
  await knex('evaluations').insert([
    {eval_name: 'OER', eval_type:'Annual', eval_date: '2023-10-03', users_id: 1},
    {eval_name: 'NCOER', eval_type:'Annual', eval_date: '2023-10-03', users_id: 4},
    {eval_name: 'Counseling', eval_type:'Performance', eval_date: '2022-10-03', users_id: 5}
  ]);
};
