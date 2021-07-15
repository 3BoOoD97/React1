const express = require("express");
const app = express()
const db = require ('./config/database.js') //connect to database

//bring static
app.use(express.static('public'))
app.use(express.static('node_modules'))


//bring ejs template
app.set('view engine', 'ejs');




app.get('/', (req,res)=>{
  res.send("Work");
});

//bring events route
const events = require ('./routes/even-routes')
app.use('/events', events)


//listen to port 3000
app.listen(3000, ()=>{
  console.log("port 3000")
})
