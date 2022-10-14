/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('medical').del()
  await knex('medical').insert([
    {id: 1, pha_date: '2019-10-03', dental_date:'2022-10-30', hearing_date:'2021-04-03', hiv_date:'2021-01-10', vision_date:'2022-10-15', users_id:1},
    {id: 2,pha_date: '2022-10-31', dental_date:'2023-08-29', hearing_date:'2023-01-10', hiv_date:'2023-01-10', vision_date:'2023-01-10', users_id:2},
    {id: 3,pha_date: '2023-07-04', dental_date:'2023-12-25', hearing_date:'2022-08-05', hiv_date:'2023-01-10', vision_date:'2023-01-10', users_id:3},
    {id: 4,pha_date: '2023-05-15', dental_date:'2023-10-12', hearing_date:'2024-03-27', hiv_date:'2023-01-10', vision_date:'2023-01-10', users_id:4},
    {id: 5,pha_date: '2023-05-15', dental_date:'2023-10-12', hearing_date:'2024-03-27', hiv_date:'2023-01-10', vision_date:'2023-01-10', users_id:5},
    {id: 6,pha_date: '2023-10-03', dental_date:'2022-09-15', hearing_date:'2022-10-20', hiv_date:'2023-01-10', vision_date:'2023-01-10', users_id:6}
  ]);
};
