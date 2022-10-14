/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('static_skills').del()
  await knex('static_skills').insert([
    {skill_name: 'Knowledge Management Professional', skill_date: '2022-07-01', users_id:1},
    {skill_name: 'Air Assault', skill_date: '2022-07-01', users_id:2},
    {skill_name: 'Euphonium Player', skill_date: '2020-05-01', users_id:3},
    {skill_name: 'Tuba Player', skill_date: '2015-02-01', users_id:3},
    {skill_name: 'Knowledge Management Professional', skill_date: '2022-07-01', users_id:6},
    {skill_name: 'Air Assault', skill_date: '2022-07-01', users_id:6},
    {skill_name: 'Euphonium Player', skill_date: '2020-05-01', users_id:6},
    {skill_name: 'Tuba Player', skill_date: '2015-02-01', users_id:6}
  ]);
};
