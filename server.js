
//npm package 
const express = require('express');
const mongoose = require('mongoose');
const serverResponse = require("./utilsServer/serverResponse");
let cors = require("cors");
const array=require('./utilsServer/arraysValidationKeys')

console.log(array.arraysValidationKeys);

require("dotenv").config();

//express functionally get to app this is a shorthand
const app =express();

app.use(express.json());
app.use(express.static("client/build"));
app.use(cors());



//mongoose.connect('mongodb://localhost:27017/Products');

const ProductsModel = mongoose.model('Products',{
    
                category:{type:String,required:true},
                description:{type:String,required:true},
                image:{type:String,required:true},
                price:{type:Number,required:true},
                title:{type:String,required:true},

});


app.get("/api", async (req,res)=>{

    try{
           //the empty object in find function is gor get every object in the db
        const allProuducts=await ProductsModel.find({});
        serverResponse(res,200,allProuducts);


    }catch(e){

        serverResponse(res,500,{message:"internal error occured "+{e}});
    }
  
})

app.get("/products/:productsId", async (req,res)=>{


    try{

        const productsId= req.params.productsId;
           //find the products with this specific ID
        const allProuducts=await ProductsModel.findOne({_id:productsId});
        serverResponse(res,200,allProuducts);

    }catch(e){

        serverResponse(res,500,{message:"internal error occured"});
    }
  

})

app.post("/api/product", async (req,res)=>{


    try{

        console.log({...req.body});
        //build new products from the client side with a json model
        const newproductsFromClient= {...req.body};
        //get the newproduct with the speific model 
        const newProduct= new ProductsModel(newproductsFromClient);
        //save the newproducts with the specific model
        await newProduct.save();
    
        serverResponse(res,200,newProduct);

    }catch(e){

        console.log(e);
        serverResponse(res,500,{message:"internal error occured"+e});
    }
  

})

app.put("/api/updateProducts/:prodcutID", async (req,res)=>{


    try{

        const productID=req.params.prodcutID;
        //the req body is a object anf the object key is a function that return in a array the keys of the object
        const updateKey= Object.keys(req.body);
        console.log("dsad",updateKey);
        //cheke if the keys that i want to update is in my list that i given to update
        const chekeIfUpdateValid=updateKey.every((updateItem)=>array.arraysValidationKeys.includes(updateItem));

        if(!chekeIfUpdateValid){

            serverResponse(res,500,{message:"not provide to update products"});

        }else{

            const producteUpdate= await ProductsModel.findById({_id:productID});

           if(!producteUpdate){
            serverResponse(res,500,{message:"the product not exist"});

           }else{
 
            updateKey.forEach(item=>{producteUpdate[item]=req.body[item]})
            await  producteUpdate.save();
            //this is the product after change 
            serverResponse(res,200,producteUpdate);
           }

        }
    }catch(e){

        console.log(e);
        serverResponse(res,500,{message:"internal error occured"+e});
    }
  

})



app.delete("/api/products/:productsID", async (req,res)=>{


    try{

        const productID=req.params.productsID;
        const deletedProuduct=await ProductsModel.findByIdAndDelete({_id:productID});
    
        serverResponse(res,200,deletedProuduct);

    }catch(e){

        console.log(e);
        serverResponse(res,500,{message:"internal error occured"+" "+e});
    }
  

})


//last rout is the * rout for all the request with no matching rout will come to this rout and render the index.html 
app.get('*',(req,res)=>{

    // console.log(__dirname)
     res.sendFile(`${__dirname}/client/public/index.html`)
   
 
 })

 console.log("pdsg",process.env)

 const {DB_USER,DB_PASS,DB_HOST,DB_NAME,PORT}=process.env;


 //connet mongo atlas for deploying
 mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      app.listen(PORT || 8000, () => {
        console.log("err", err);
        console.log("Ani maazin!");
      });
    }
  );
  


/*app.listen("8000",()=>{
    console.log("the app is runnig on port 8000");
})

mongodb+srv://benjaminHarroch:<password>@gocodeshop.h6srkwc.mongodb.net/test*/
