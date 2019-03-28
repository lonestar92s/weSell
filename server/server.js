const express = require('express')
const { Client } = require('pg')
const itemRouter = require('../controller/router.js')
const userRouter = require('../controller/userRouter.js')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')


//set app
let app = express()
// Whitelist

app.use(cors());

//error handler
app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(404).send('Oh noooo')
})

app.use(morgan('dev'))
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//set port
const PORT = 9000
const port = process.env.PORT || 5000;

app.use('/items', itemRouter)
app.use('/customers', userRouter)

app.listen(PORT, ()=>{
console.log("we connected")
})
















