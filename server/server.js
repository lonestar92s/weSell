const express = require('express')
const { Client } = require('pg')
//set port
const PORT = 9000



//set up pg module
const connectionString = 
'postgresql://aluko17:@localhost:5432/weSell'

//instantiate the client and pass it the connection string
const client = new Client({ connectionString })
client.connect().then(()=>{console.log('client connection')})

//query


//set app
let app = express()

//get
app.get('/songs/:id', (req, res)=>{


	let text ='SELECT * FROM Songs WHERE song_id = $1'
	


	client.query(text, values)
	.then(result => {
		res.send(result.rows)
	})
	.catch(error => response.send(error))

})





app.listen(PORT, ()=>{
console.log("we connected")
})