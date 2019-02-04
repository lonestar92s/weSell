const express = require('express')
const postRouter = express.Router()
const { Client } = require('pg')
const bodyParser = require('body-parser')


//set up pg module
const connectionString = 
'postgresql://aluko17:@localhost:5432/weSell'


const client = new Client({ connectionString })
client.connect().then(()=>{console.log('client connection')})

//use body parser as middleware
postRouter.use(bodyParser.urlencoded({ extended: false }));
postRouter.use(bodyParser.json());

//post
postRouter.post('/additems', (req, res)=>{
	let text ='SELECT item_name, item_price, item_brand, item_category FROM Items'
	client.query(text)
	.then(result => {
		res.send(result.rows)
	})
	.catch(error => response.send(error))
})




module.exports = postRouter