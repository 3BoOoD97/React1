const e = require('express')
const db = require('../config/database')
const Event = require('../models/event')

let event1 = new Event  ({
   title: 'eve1',
   description: 'test des1',
   location: 'Sweden',
   date: Date.now()
})

event1.save((err)=>{
if (err){
    console.log(err)
}
else{
    console.log("rec was added")

}

})