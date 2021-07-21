const express = require("express");
const router = express.Router();
const User = require("../models/User")

//Sign up form
router.get('/signup', (req,res)=>{
    res.render('user/signup')
})

//sing up post req
router.post('/signup', (req,res)=>{
    console.log(req.body)
    res.json('signup ...')
})

// login user view
router.get('/login', (req,res)=>{
    res.render('user/login')
})

//login post req
router.post('/login', (req,res)=>{
    console.log(req.body)
    res.json('login ...')
})


//profile
router.get('/profile', (req,res)=>{
    res.render('user/profile')
})

//logout
router.get('/logout', (req,res)=>{
    res.json('logout ....')
})

module.exports= router;