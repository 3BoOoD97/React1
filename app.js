const express = require("express");
const app = express()
const db = require ('./config/database.js') //connect to database
var bodyParser = require('body-parser')
const session= require('express-session')
const flash= require('connect-flash')


//bring static
app.use(express.static('public'))
app.use(express.static('node_modules'))

//session and flash config
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 *15  }
}))
app.use(flash())


//bring ejs template
app.set('view engine', 'ejs');

//bring BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.get('/', (req,res)=>{
  res.redirect('/events')
});

//bring users route
const users = require ('./routes/user-routes')
app.use('/users', users)

//brin events routes
const events = require ('./routes/even-routes')
app.use('/events', events)

//listen to port 3000
app.listen(3000, ()=>{
  console.log("port 3000")
})
