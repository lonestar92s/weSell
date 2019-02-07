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

//get by user
router.get('/:username', (req, res)=>{
	const username = req.params.username
	let query ='SELECT item_name, item_price, item_brand, item_category FROM Items WHERE username =($1)'
	client.query(query, [username])
	.then(result => {
		res.send(result.rows)
	})
	.catch(error => res.send(error))
})

//get by furniture category
router.get('/category/:item_category', (req, res)=>{
	const category = req.params.item_category
	let query ='SELECT item_name, item_price, item_brand, username FROM Items WHERE item_category =($1)'
	client.query(query, [category])
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
	const data = {item_name:req.body.item_name, item_price:req.body.item_price, item_brand:req.body.item_brand, item_category:req.body.item_category}
	const id = req.params.id
	let query = `UPDATE Items SET item_name =($1),item_price =($2),item_brand=($3),item_category=($4) WHERE item_id =($5)` 
	
	
	client.query(query, [data.item_name, data.item_price, data.item_brand, data.item_category, id])
	
		.then(result => {
			res.send(result.rows)
		})
		.catch(error => res.send(error))
})

//delete

router.delete('/:id', (req,res)=>{
	const id = req.params.id
	let query = `DELETE FROM Items WHERE item_id=($1)`
	client.query(query, [id])
		.then(result => {
			res.send(result.rows)
		})
		.catch(error => res.send(error))
})







module.exports = router