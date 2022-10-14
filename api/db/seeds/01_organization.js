/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('organization').del()
  await knex('organization').insert([
    {organization_name: '5th SFG(A), 3rd BN, B CO, ODA 5322', UIC:'WH06B2'},
    {organization_name: '3rd SFG(A), 2nd BN, 3 CO, ODA 3234', UIC:'W47AAA'},
    {organization_name: '1/75 Ranger Regiment HHC', UIC:'WH3LTO'}
  ]);
};
