/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('annual_training').del()
  await knex('annual_training').insert([
    {training_name: 'Cyber_Awareness', training_date:'2020-02-22',users_id:1},
    {training_name: 'Cyber_Awareness', training_date:'2021-06-21',users_id:2},
    {training_name: 'Sharp_Training', training_date:'2020-08-17',users_id:1},
    {training_name: 'Sharp_Training', training_date:'2020-08-17',users_id:6},
    {training_name: 'Cyber_Awareness', training_date:'2021-06-21',users_id:3},
    {training_name: 'Cyber_Awareness', training_date:'2021-06-21',users_id:4},
    {training_name: 'Information Assurance', training_date:'2021-09-27',users_id:6},
    {training_name: 'Cyber_Awareness', training_date:'2021-06-21',users_id:5},
    {training_name: 'Cyber_Awareness', training_date:'2021-06-21',users_id:6},
  ]);
};
