/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    await knex('app_authors').select('*')
      .then((rows) => {
        if (rows.length === 0) {
          return knex('app_authors').insert([
            {first_name: 'Michel', last_name: 'Alam'},
            {first_name: 'Russell', last_name: 'Annis'},
            {first_name: 'Heath', last_name: 'McGraw'},
            {first_name: 'Justin', last_name: 'Hernandez'},
            {first_name: 'Tristan', last_name: 'Hicks'}
          ]);
        }
      })
  };