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
	
	let query ='SELECT username, first_name, last_name, member_level, email, zipcode FROM Customers'
	client.query(query)
	.then(result => {
		res.send(result.rows)
	})
	.catch(error => res.send(error))
})

//create
router.post('/', (req, res) => {

  const data = {customer_id : req.body.customer_id, username:req.body.username, first_name:req.body.first_name, last_name:req.body.last_name, member_level:req.body.member_level, email: req.body.email, zipcode: req.body.zipcode };
  // SQL Query > Insert Data
  let query ='INSERT INTO Customers(customer_id, username, first_name, last_name, member_level, email, zipcode) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  // Grab data from http request

    client.query(query, [data.customer_id, data.username, data.first_name, data.last_name, data.member_level, data.email, data.zipcode])
  		.then(result => {
		res.send(result.rows)
	})
	.catch(error => res.send(error))
   

})
//update 
router.put('/:id', (req, res)=>{
	const data = {username: req.body.username, first_name:req.body.first_name, last_name:req.body.last_name, member_level:req.body.member_level, email:req.body.email, zipcode:req.body.zipcode}
	const id = req.params.id
	let query = `UPDATE Customers SET username =($1),first_name =($2),last_name=($3),member_level=($4),email=($5),zipcode=($6) WHERE item_id =($7)` 
	
	
	client.query(query, [data.username, data.first_name, data.last_name, data.member_level,data.email,data.zipcode, id])
	
		.then(result => {
			res.send(result.rows)
		})
		.catch(error => res.send(error))
})

//delete

router.delete('/:id', (req,res)=>{
	const id = req.params.id
	let query = `DELETE FROM Customers WHERE customer_id=($1)`
	client.query(query, [id])
		.then(result => {
			res.send(result.rows)
		})
		.catch(error => res.send(error))
})







module.exports = router