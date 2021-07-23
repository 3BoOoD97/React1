const express = require("express");
const { event, get } = require("jquery");
const router = express.Router();
const Event = require('../models/event')
const { check, validationResult } = require('express-validator');
const momnet = require('momnet');
const { response } = require("express");

// middleware to check if the user is logged in
isAuthenticated  = (req,res,next)=>{
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

// create a new event
router.get('/create', isAuthenticated,(req,res)=> {
    res.render('event/create',{
        errors: req.flash('errors')
    })
    })
    
//route to home event
router.get('/:pageNo?', (req,res)=> {
    let pageNo = 1

    if(req.params.pageNo){
        pageNo  = parseInt(req.params.pageNo)
    }
    if(req.params.pageNo == 0){
        pageNo= 1
    }

    let q = {
        skip: 5*(pageNo-1),
        limit: 5
    }

    // find total records
    let totalDoc = 0
    Event.countDocuments({}, (err, total)=>{

    }).then((response)=>{
        totalDoc = parseInt(response)

        Event.find({},{},q,(err,events)=>{
            // res.json(events)
            let chunk = []
            let chunkSize = 3
            for(let i=0; i<events.length; i+=chunkSize){
                chunk.push(events.slice(i, chunkSize+i))
            }
            //res.json(chunk)
            res.render('event/index', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDoc),
                pageNo: pageNo
            })
         })
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

    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        res.redirect('/events/create')
    }
    
    else {
        let newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            user_id: req.user.id,
            created_at: Date.now()
        })
    
        newEvent.save((err)=>{
            if(!err){
                console.log("ADDED")
                req.flash('info', 'The event was created successfuly')
                res.redirect('/events')
            }
            else{
                console.log("error")
            }
        })    }
  })

//show single event
router.get('/show/:id', (req,res)=> {
    Event.findOne({_id: req.params.id}, (err,event)=>{
        if(!err){
        res.render('event/show', {
            event: event
        })
        }
    })
})

//edit route 
router.get('/edit/:id', isAuthenticated, (req, res)=>{
    Event.findOne({_id: req.params.id}, (err,event)=>{
        if(!err){
            res.render('event/edit', {
            event: event,
            eventDate: momnet(event.date).format('YYYY-MM-DD'),
            errors: req.flash('errors'),
            message: req.flash('info')
        })
        }
        else{
            console.log("error")
        }
    })
})

//update the form
router.post('/update',[
    check('title').isLength({min: 5}).withMessage('Title should be more than five'),
    check('description').isLength({min: 5}).withMessage('description should be more than five'),
    check('location').isLength({min: 5}).withMessage('location should be more than five'),
    check('date').isLength({min: 5}).withMessage('Date should be valid'),
], isAuthenticated, (req, res)=>{

    const errors = validationResult(req)

    if (!errors.isEmpty()) {    
        req.flash('errors', errors.array())
        res.redirect('/events/edit/' + req.body.id)
    } else {
        // Create object
        let newObj = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,

        }
        let query = {_id: req.body.id}
        Event.updateOne(query, newObj, (err)=>{
            if(!err){
                req.flash('info', "The event was updated succesfuly")
                res.redirect('/events/edit/' + req.body.id)
            }
            else{
                console.log(err)
            }
        })
    }
})

//delete event
router.delete('/delete/:id', isAuthenticated,(req,res)=> {

    let query = {_id: req.params.id}

    Event.deleteOne(query, (err)=> {

        if(!err) {
            res.status(200).json('deleted')
        } else {
            res.status(404).json('There was an error .event was not deleted')
        }
    })
})

module.exports = router;