const express = require('express')
const { Client } = require('pg')
const getRouter = require('../controller/router.js')

//set port
const PORT = 9000




//query


//set app
let app = express()


app.use(getRouter)






app.listen(PORT, ()=>{
console.log("we connected")
})



