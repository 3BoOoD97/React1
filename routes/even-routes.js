const express = require("express");
const { event, get } = require("jquery");
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

// create a new event
router.get('/create', (req,res)=> {
res.render('event/create')
})

//save event to DB
router.post('/create', (req,res)=> {
    console.log(req.body)
  })

//show single event
router.get('/:id', (req,res)=> {
    Event.findOne({_id: req.params.id}, (err,event)=>{
        if(!err){
        res.render('event/show', {
            event: event
        })
        }
    })
})


module.exports = router;