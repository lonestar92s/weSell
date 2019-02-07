const express = require('express')
const { Client } = require('pg')
const itemRouter = require('../controller/router.js')
const userRouter = require('../controller/userRouter.js')
const morgan = require('morgan')
const bodyParser = require('body-parser')


//set app
let app = express()

//error handler
app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(404).send('Oh noooo')
})

//body parser
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//set port
const PORT = 9000

app.use('/items', itemRouter)
app.use('/customers', userRouter)

app.listen(PORT, ()=>{
console.log("we connected")
})














