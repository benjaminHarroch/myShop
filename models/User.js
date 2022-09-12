
const mongoose = require('mongoose');

const UserModel = mongoose.model('User',{
    
    userName:{type:String,required:true},
    mail:{type:String,required:true},
    password:{type:String,required:true},

});

module.exports=UserModel;