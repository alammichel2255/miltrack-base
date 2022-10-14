const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('App root route running');
})

// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa


// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');



app.get('/users', (req, res) => {
    knex.select('*')
    .from('users')
    .then(data => res.send(data));
})
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*')
    .from('users')
    .where({ id: id })
    .then(data => res.send(data));
})

app.get('/organization', (req, res) => {
    knex.select('*')
    .from('organization')
    .then(data => res.send(data));
})
app.get('/organization/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*')
    .from('organization')
    .where({ id: id })
    .then(data => res.send(data));
})

app.get('/additional', (req, res) => {
    knex.select('*')
    .from('additional')
    .then(data => res.send(data));
})
app.get('/additional/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*')
    .from('additional')
    .where({ users_id: id })
    .then(data => res.send(data));
})

app.get('/annual_training', (req, res) => {
    knex.select('*')
    .from('annual_training')
    .then(data => res.send(data));
})
app.get('/annual_training/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*')
    .from('annual_training')
    .where({ users_id: id })
    .then(data => res.send(data));
})

app.get('/medical', (req, res) => {
    knex.select('*')
    .from('medical')
    .then(data => res.send(data));
})
app.get('/medical/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*')
    .from('medical')
    .where({ users_id: id })
    .then(data => res.send(data));
})

app.get('/evaluations', (req, res) => {
    knex.select('*')
    .from('evaluations')
    .then(data => res.send(data));
})
app.get('/evaluations/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*')
    .from('evaluations')
    .where({ users_id: id })
    .then(data => res.send(data));
})

app.get('/special_skills', (req, res) => {
    knex.select('*')
    .from('special_skills')
    .then(data => res.send(data));
})
app.get('/special_skills/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*')
    .from('special_skills')
    .where({ users_id: id })
    .then(data => res.send(data));
})

app.get('/static_skills', (req, res) => {
    knex.select('*')
    .from('static_skills')
    .then(data => res.send(data));
})
app.get('/static_skills/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*')
    .from('static_skills')
    .where({ users_id: id })
    .then(data => res.send(data));
})


// ━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━


app.post('/users', (req, res) => {
    knex('users').insert(req.body)
        .then(data => res.send({ message: 'user created' }))  
})
app.post('/organization', (req, res) => {
    knex('organization').insert(req.body)
        .then(data => res.send({ message: 'organization created' }))  
})
app.post('/organization/:id', (req, res) => {
    let { id } = req.params;
    knex('organization')
    .insert(req.body,  ['*'])
    .then(data => res.send({ message: 'training added' }))
    .catch(err =>
        res.status(404).json({
             Message: `Error: ${err}`
        }))  
})
app.post('/additional', (req, res) => {
    knex('additional').insert(req.body)
        .then(data => res.send({ message: 'additional info added' }))  
})
app.post('/additional/:id', (req, res) => {
    let { id } = req.params;
    knex('additional')
    .insert(req.body,  ['*'])
    .then(data => res.send({ message: 'training added' }))
    .catch(err =>
        res.status(404).json({
             Message: `Error: ${err}`
        }))  
})
app.post('/annual_training', (req, res) => {
    let { id } = req.params;
    knex('annual_training')
    .insert(req.body,  ['*'])
    .then(data => res.send({ message: 'training added' }))
    .catch(err =>
        res.status(404).json({
             Message: `Error: ${err}`
        }))  
})
app.post('/annual_training/:id', (req, res) => {
    let { id } = req.params;
    knex('annual_training')
    .insert(req.body,  ['*'])
    .then(data => res.send({ message: 'training added' }))
    .catch(err =>
        res.status(404).json({
             Message: `Error: ${err}`
        }))  
})
app.post('/medical', (req, res) => {
    knex('medical').insert(req.body)
        .then(data => res.send({ message: 'medical info added' }))  
})
app.post('/medical/:id', (req, res) => {
    let { id } = req.params;
    knex('medical')
    .insert(req.body,  ['*'])
    .then(data => res.send({ message: 'training added' }))
    .catch(err =>
        res.status(404).json({
             Message: `Error: ${err}`
        }))  
})
app.post('/evaluations', (req, res) => {
    knex('evaluations').insert(req.body)
        .then(data => res.send({ message: 'eval added' }))  
})
app.post('/evaluations/:id', (req, res) => {
    let { id } = req.params;
    knex('evaluations')
    .where({users_id: id})
    .insert(req.body,  ['*'])
    .then(data => res.send({ message: 'training added' }))
    .catch(err =>
        res.status(404).json({
             Message: `Error: ${err}`
        }))  
})
app.post('/special_skills', (req, res) => {
    knex('special_skills').insert(req.body)
        .then(data => res.send({ message: 'skill added' }))  
})
app.post('/special_skills/:id', (req, res) => {
    let { id } = req.params;
    knex('special_skills')
    .where({users_id: id})
    .insert(req.body,  ['*'])
    .then(data => res.send({ message: 'training added' }))
    .catch(err =>
        res.status(404).json({
             Message: `Error: ${err}`
        }))  
})

app.post('/static_skills', (req, res) => {
    knex('static_skills').insert(req.body)
        .then(data => res.send({ message: 'skill added' }))  
})

app.post('/static_skills/:id', (req, res) => {
    let { id } = req.params;
    knex('static_skills')
    .where({users_id: id})
    .insert(req.body,  ['*'])
    .then(data => res.send({ message: 'training added' }))
    .catch(err =>
        res.status(404).json({
             Message: `Error: ${err}`
        }))  
})


// ━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━


app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    knex('users')
        .where({ id: id })
        .update(req.body)
        .then(data => res.send({ message: 'user updated' }))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            }))
})
app.patch('/organization/:id', (req, res) => {
    const { id } = req.params;
    knex('organization')
        .where({ id: id })
        .update(req.body)
        .then(data => res.send({ message: 'user updated' }))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            }))
})
app.patch('/additional/:id', (req, res) => {
    const { id } = req.params;
    knex('additional')
        .where({ id: id })
        .update(req.body)
        .then(data => res.send({ message: 'user updated' }))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            }))
})
app.patch('/annual_training/:id', (req, res) => {
    const { id } = req.params;
    knex('annual_training')
        .where({ users_id: id })
        .where({ training_name: req.body.training_name })
        .update(req.body, ['*'])
        .then(data => res.send({ message: 'user updated' }))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            }))
})
app.patch('/medical/:id', (req, res) => {
    const { id } = req.params;
    
    // if (req.body.pha_date) {

    // } else if ((req.body.medical_date)) {

    // } else if ((req.body.dental_date)) {

    // } else if ((req.body.vision_date)) {

    // } else if ((req.body.hearing_date)) {
    
    
    // }
    knex.select('*')
    .from('medical')
    .where({ users_id: id })
        .update(req.body, ['*'])
        .then(data => res.send({ message: 'user updated' }))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.patch('/evaluations/:id', (req, res) => {
    const { id } = req.params;
    knex('evaluations')
        .where({ users_id: id })
        .update(req.body)
        .then(data => res.send({ message: 'user updated' }))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.patch('/special_skills/:id', (req, res) => {
    const { id } = req.params;
    knex('special_skills')
        .where({ users_id: id })
        .where({ skill_name: req.body.skill_name })
        .update(req.body, ['*'])
        .then(data => res.send({ message: 'user updated' }))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.patch('/static_skills/:id', (req, res) => {
    const { id } = req.params;
    knex('static_skills')
        .where({ users_id: id })
        .where({ skill_name: req.body.skill_name })
        .update(req.body, ['*'])
        .then(data => res.send({ message: 'user updated' }))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})


// ━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━◦○◦━


app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    knex('users')
        .where({ users_id: id })
        .del()
        .then(res.send({message: 'member deleted'}))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.delete('/organization/:id', (req, res) => {
    const { id } = req.params;
    knex('organization')
        .where({ users_id: id })
        .del()
        .then(res.send({message: 'organization deleted'}))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.delete('/additional/:id', (req, res) => {
    const { id } = req.params;
    knex('additional')
        .where({ users_id: id })
        .del()
        .then(res.send({message: 'info deleted'}))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.delete('/annual_training/:id', (req, res) => {
    const { id } = req.params;
    knex('annual_training')
        .where({ users_id: id })
        .where({ training_name: req.body.training_name })
        .del()
        .then(res.send({message: 'training deleted'}))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.delete('/medical/:id', (req, res) => {
    const { id } = req.params;
    knex('medical')
        .where({ users_id: id })
        .del()
        .then(res.send({message: 'medical deleted'}))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.delete('/evaluations/:id', (req, res) => {
    const { id } = req.params;
    knex('evaluations')
        .where({ users_id: id })
        .del()
        .then(res.send({message: 'evaluations deleted'}))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.delete('/special_skills/:id', (req, res) => {
    const { id } = req.params;
    knex('special_skills')
        .where({ users_id: id })
        .where({ skill_name: req.body.skill_name })
        .del()
        .then(res.send({message: 'skill deleted'}))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))
})
app.delete('/static_skills/:id', (req, res) => {
    const { id } = req.params;
    knex('static_skills')
        .where({ users_id: id })
        .where({ skill_name: req.body.skill_name })
        .del()
        .then(res.send({message: 'skill deleted'}))
        .catch(err =>
            res.status(404).json({
                 Message: `Error: ${err}`
            }))

})


// app.listen(port, (req, res) => {
//     // https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

//     console.log(`App is listening at port ${port}`);
// })


module.exports = app;

