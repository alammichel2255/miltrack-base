/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('special_skills').del()
  await knex('special_skills').insert([
    
    {skill_name: 'SEC+', skill_refresh_date:'2025-05-22', users_id:1 },
    {skill_name: 'CLANG', skill_refresh_date:'2023-08-09', users_id:2 },
    {skill_name: 'Radio Technician', skill_refresh_date:'2023-11-11', users_id:3 },
    {skill_name: 'JTAC', skill_refresh_date:'2024-06-18', users_id:4 },
    {skill_name: 'SEC+', skill_refresh_date:'2025-05-22', users_id:6 },
    {skill_name: 'CLANG', skill_refresh_date:'2023-08-09', users_id:6 },
    {skill_name: 'Radio Technician', skill_refresh_date:'2023-11-11', users_id:6 },
    {skill_name: 'JTAC', skill_refresh_date:'2024-06-18', users_id:6 }


  ]);
};
