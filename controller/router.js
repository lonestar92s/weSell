const express = require('express')
const router = express.Router()
const { Client } = require('pg')
const bodyParser = require('body-parser')
let app = express()



//body parser
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//set up pg module
const connectionString = 
'postgresql://aluko17:@localhost:5432/weSell'


const client = new Client({ connectionString })
client.connect().then(()=>{console.log('client connection')})


//get all items
router.get('/', (req, res)=>{
	
	let query ='SELECT item_name, item_price, item_brand, item_category FROM Items'
	client.query(query)
	.then(result => {
		res.send(result.rows)
	})
	.catch(error => res.send(error))
})

//create
router.post('/', (req, res) => {

  const data = {item_id : req.body.item_id, item_name:req.body.item_name, item_price:req.body.item_price, item_brand:req.body.item_brand, item_category:req.body.item_category};
  // SQL Query > Insert Data
  let query ='INSERT INTO Items(item_id, item_name, item_price, item_brand, item_category) VALUES ($1, $2, $3, $4, $5)'
  // Grab data from http request

    client.query(query, [data.item_id, data.item_name, data.item_price, data.item_brand, data.item_category])
  		.then(result => {
		res.send(result.rows)
	})
	.catch(error => res.send(error))
   

})
//update 
router.put('/:id', (req, res)=>{
	let id = req.params.id
	let query = `UPDATE Items SET item_name ='Standup Paddleboard' WHERE item_id = ${id}` 
	let query2 = `SELECT * FROM Items WHERE item_id = ${id}`
	
	client.query(query)
	client.query(query2)
		.then(result => {
			res.send(result.rows)
		})
		.catch(error => res.send(error))
})






module.exports = router