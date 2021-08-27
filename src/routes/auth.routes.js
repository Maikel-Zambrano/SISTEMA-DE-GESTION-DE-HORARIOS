const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotloggedIn}=require('../lib/auth');


router.get('/signup',isNotloggedIn, (req, res)=>{
    res.render('auth/signup');
});

router.get('/signin', (req,res)=>{
  res.render('auth/signin');
});

router.post('/signin',isNotloggedIn,(req,res, next)=>{
  passport.authenticate('local.signin',{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    failureFlash:true
  })(req, res, next);
});

router.post('/signup', passport.authenticate('local.signup',{
  successRedirect:'/signin',
  failRedirect:'/signup',
  failureFlash:true
}))

router.get('/profile',isLoggedIn,(req, res)=>{
  res.render('profile');
});

router.get('/logout',isLoggedIn,(req,res)=>{
  req.logOut();
  res.redirect('/signin');
})
module.exports= router;
