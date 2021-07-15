const e = require('express')
const db = require('../config/database')
const Event = require('../models/event')

let newEve = [
    new Event({
        title: 'eve1',
        description: 'test des1',
        location: 'Sweden',
        created_at: Date.now(),
        date: Date.now(),
    }),

    new Event({
        title: 'eve2',
        description: 'test des2',
        location: 'Holland',
        created_at: Date.now(),
        date: Date.now(),
    }),

    new Event({
        title: 'eve3',
        description: 'test des3',
        location: 'KSA',
        created_at: Date.now(),
        date: Date.now(),
    })
]

newEve.forEach((event)=>{
    event.save((err)=>{
        if(err){
            console.log(err);
        }
    })
})
/*
let event1 = new Event  ({
   title: 'eve1',
   description: 'test des1',
   location: 'Sweden',
   date: Date.now(),
})

event1.save((err)=>{
if (err){
    console.log(err)
}
else{
    console.log("rec was added")
}
})
*/