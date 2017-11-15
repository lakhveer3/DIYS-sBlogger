const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/registerForm');

passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(id, done) {
  users.findById(id, function(err, user) {
   done(err, user);
  });
});
console.log("inside passport");

// passport.use(new LocalStrategy( function(username, password, done) {
passport.use(new LocalStrategy(function(email, password, done) {
      console.log("inside callback passport"+email+"----"+password+"----");
        process.nextTick(function() {
          console.log("inside callback!!!!");
          User.getUserByUsername(email, function(err, user){
            if(err) throw err;
            console.log(user);
            return done(null, user);
          });

        });
    }));

module.exports = passport;
