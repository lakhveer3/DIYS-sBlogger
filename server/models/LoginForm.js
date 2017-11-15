const mongoose = require('mongoose')
    , Schema = mongoose.Schema;


let Loginform = new Schema({
  username : String,
  password : String,

});

module.exports = mongoose.model('userLogin',Loginform );
