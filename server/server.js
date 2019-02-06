const express = require('express')
const { Client } = require('pg')
const itemRouter = require('../controller/router.js')
const bodyParser = require('body-parser')

//set app
let app = express()


//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//set port
const PORT = 9000

app.use('/items', itemRouter)


app.listen(PORT, ()=>{
console.log("we connected")
})














