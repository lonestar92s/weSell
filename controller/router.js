const express = require('express')
const router = express.Router()
const { Client } = require('pg')
const bodyParser = require('body-parser')


//set up pg module
const connectionString =
    'postgresql://aluko17:@localhost:5432/weSell'


const client = new Client({ connectionString })
client.connect().then(() => { console.log('client connection') })


//get all items
router.get('/', (req, res) => {
    let query = 'SELECT item_name, item_price, item_brand, item_category FROM Items'
    client.query(query)
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => res.send(error))
})

router.post('/', (req, res) => {
    let query = 'INSERT INTO items(item_id, item_name) VALUES ($1, $2)'
    const values = []
    // SQL Query > Insert Data
    for (let item in req.body)
        values.push(req.body[item])
    // Grab data from http request
    client.query(query, values)
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => res.send(error))

})











//update

//delete


module.exports = router