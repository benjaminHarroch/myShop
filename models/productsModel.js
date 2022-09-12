
const mongoose = require('mongoose');

const ProductsModel = mongoose.model('Products',{
    
    category:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    title:{type:String,required:true},

});

module.exports=ProductsModel;