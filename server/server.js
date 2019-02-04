const express = require('express')
const { Client } = require('pg')
const itemRouter = require('../controller/router.js')
const bodyParser = require('body-parser')



//body parser
itemRouter.use(bodyParser.urlencoded({ extended: true }));
itemRouter.use(bodyParser.json());


//set port
const PORT = 9000





//set app
let app = express()


app.use('/items', itemRouter)







app.listen(PORT, ()=>{
console.log("we connected")
})



