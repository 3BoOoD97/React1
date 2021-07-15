const express = require("express");
const { event } = require("jquery");
const router = express.Router();
const Event = require('../models/event')

//route to home event
router.get('/', (req,res)=> {
    Event.find({},(err,events)=>{
       // res.json(events)
       let chunk = []
       let chunkSize = 3
       for(let i=0; i<events.length; i+=chunkSize){
           chunk.push(events.slice(i, chunkSize+i))
       }
       //res.json(chunk)
       res.render('event/index', {
           chunk: chunk
       })

    })
})

//show single event
router.get('/:id', (req,res)=> {
    Event.find({_id: req.params.id}, (err,event)=>{
        if(!err){
            console.log(event)
        res.render('event/show')
        }
        
    })
})


module.exports = router;