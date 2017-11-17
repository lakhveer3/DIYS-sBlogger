const ingredients =  require('express').Router();
var mongoose = require('mongoose');
var EssentialIng = require('./../models/DiyDetailsSchema.js');
var db = require('./../connections/dbconnect.js');
db.on('error', console.error.bind(console, 'connection error:'));
const passport = require('passport');
const users = require('../models/registerForm');
db.once('open', function() {
  console.log('connected to DB!');
});

ingredients.post('/userIngredientDetails', (req,res)=>{
  let val = JSON.parse(req.query.details);
  let a = new EssentialIng(val);
  console.log('before saving : ',val);
  a.save( (err, reply)=>{
    if (err) {
      console.log('err in saving : ',err);
    }
    else {
      console.log('res from saving : ', reply);
    }
    res.send('data saved succesfully');
  });
  console.log(req.query.details.url);
});

ingredients.post('/login',passport.authenticate('local'),(req,res)=>{
  console.log("req.user ",req.user);
  if(res){
    // console.log(req.user);
    res.send(req.user);
  }
});
ingredients.post('/logout', function(req, res){
    // req.flash('success_msg', 'You are logged out');
    console.log("you are logging out ",req.query.email);
    res.send(req.query.email);
});

ingredients.post('/register', (req,res)=>{
  let val =JSON.parse(req.query.details);
  console.log(val,"value in router");
  let newUser= new users(val);

  console.log(req.query,"88");

  newUser.save(function(err,reply) {
            if (err) {
                res.send('Error in registration');
            } else {
				console.log(reply,"new user");
              res.send('User details saved successfully');
            }
          });
});

module.exports = ingredients;
