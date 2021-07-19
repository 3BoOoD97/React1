const express = require("express");
const { event, get } = require("jquery");
const router = express.Router();
const Event = require('../models/event')
const { check, validationResult } = require('express-validator');

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
res.render('event/create',{
    errors:false

})
})

//save event to DB
router.post('/create', [
    check('title').isLength({min: 5}).withMessage('Title should be more than five'),
    check('description').isLength({min: 5}).withMessage('description should be more than five'),
    check('location').isLength({min: 5}).withMessage('location should be more than five'),
    check('date').isLength({min: 5}).withMessage('Date should be valid'),

] ,(req,res)=> {
    const errors = validationResult(req)

    if (!errors.isEmpty()){

        res.render('event/create', {
            errors: errors.array()
        })
    }
    
    else {
        let newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            created_at: Date.now()
        })
    
        newEvent.save((err)=>{
            if(!err){
                console.log("ADDED")
                res.redirect('/events')
            }
            else{
                console.log("error")
            }
        })    }
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