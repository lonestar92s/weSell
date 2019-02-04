const express = require('express')
const router = express.Router()
const { Client } = require('pg')


//set up pg module
const connectionString = 
'postgresql://aluko17:@localhost:5432/weSell'


const client = new Client({ connectionString })
client.connect().then(()=>{console.log('client connection')})


//get
router.get('/', (req, res)=>{
	let query ='SELECT item_name, item_price, item_brand, item_category FROM Items'
	client.query(query)
	.then(result => {
		res.send(result.rows)
	})
	.catch(error => res.send(error))
})

//post
router.post('/', (req, res)=>{
	let query ='INSERT INTO Items(item_id, item_name, item_category, item_brand, item_price)'
	client.query(query)
	.then(result => {
		res.send(result)
	})
	.catch(error => res.send(error))
})




module.exports = router