const express = require('express')
const app = express()
const port = 8888
const models = require ('./models/user.js')
const mongoose = require ('mongoose')
const {MONOURL} = require ('./secret.js') 

require('./models/user')
require('./models/post')

mongoose.connect(MONOURL)
//for true case
mongoose.connection.on("connected",
   ()=>{console.log("Connected to MongoDB")}
)

// for false case
mongoose.connection.on("error",
   (err)=>{console.log("Error connecting to MongoDB", err)}
)
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))


const custamMiddleware=(rel, res, next)=>{
   console.log("Hello i am a middleware");
   next()
}
app.use(custamMiddleware)

 app.get('/',
    (req, res)=>{res.send("Home Page")}
 )
 app.get('/blog/', custamMiddleware,
    (req, res)=>{res.send("Blog Page")}
 )
app.get('/', function (req, res) {
  res.send('Hello World')
})






 app.listen(port, ()=>{console.log(`server is running at port ${port}`)})