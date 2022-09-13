
const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    
    userName:{type:String,required:true},
    mail:{type:String,required:true},
    password:{type:String,required:true},

});

const User = mongoose.model("User", UserModel)

module.exports=User;