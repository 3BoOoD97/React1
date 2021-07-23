const express = require("express");
const router = express.Router();
const User = require("../models/User")
const passport = require('passport')
const multer = require("multer")

//config multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/imgs')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png' )
    }
  })
   
  var upload = multer({ storage: storage })
// middleware to check if the user is logged in
   isAuthenticated  = (req,res,next)=>{
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}
//Sign up form
router.get('/signup', (req, res) => {
    res.render('user/signup', {
        error: req.flash('error')
    })
})

//sing up post req
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/signup',
        failureFlash: true
    }))

// login user view
router.get('/login', (req,res)=> {
    res.render('user/login', {
        error: req.flash('error')
    })
})

//login post req
router.post('/login',
  passport.authenticate('local.login', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/login',
      failureFlash: true })
      )


//profile
router.get('/profile', (req, res) => {

    res.render('user/profile', {
            success: req.flash('success')
    
    })
    
})
//upload user avatar
router.post('/uploadAvatar', upload.single('avatar'), (req, res)=>{
    let newFildes= {
        avatar: req.file.filename
    }
User.updateOne({_id: req.user._id}, newFildes, (err)=>{
    if(!err){
        res.redirect('/users/profile')
    }
})
})
//logout
router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/users/login');
      })

module.exports = router;