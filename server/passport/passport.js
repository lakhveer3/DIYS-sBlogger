const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../models/LoginForm');

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
      console.log("inside callback passport"+email+"1111"+password+"2222");
        process.nextTick(function() {
          console.log("inside callback!!!!");
            users.findOne({
              username:email,
              password:password
            },function(err,res){
                console.log(res);
                if(err){
                  return done(null, err);
                  }
                  else{
                    return done(null, res);
                  }
                });
        });
    }));

module.exports = passport;
