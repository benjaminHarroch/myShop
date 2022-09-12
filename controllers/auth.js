
const express = require('express');
const jwt =require('jsonwebtoken');
const serverResponse=require('../utilsServer/serverResponse');
//const { eventNames } = require('../models/productsModel');
const UserModel =require("../models/User");



const router =express.Router();
require("dotenv").config();

const {KEY_SECRETE}=process.env;


const validUserandPassword= async (userName,password)=>{

    console.log('userName',userName);
    const user=await UserModel.findOne({userName:userName});
    return user;


}

//this is a coutinue router to the router in the app.use
router.post('/login' ,async (req,res)=>{

    const userName=req.body.userName;
    const password=req.body.password;
    const user=await validUserandPassword(userName,password);

    if(user){

    try{
        console.log('1');
    
        const IDuser=user._id;
        console.log('2');

        var token = jwt.sign({ id: IDuser },KEY_SECRETE,{expiresIn:7200});
        console.log('3');
        return serverResponse(res,200,{message:token,user:user});
        console.log('4');
     
    }catch(e){

      return serverResponse(res,500,{message:"the login failed "})

   }
}

serverResponse(res,500,{message:"the user not exist"});

})


router.post('/register' ,async (req,res)=>{

    const userName=req.body.userName;
    const password=req.body.password;
    const mail= req.body.mail;
    const user=await validUserandPassword(userName,password);

    if(!user){

    try{
       
        //if the user not exist so save the user in the data base and return token
        const newUser= new UserModel({userName,password,mail});
        await newUser.save();
        const IDuser=newUser._id;

        var token = jwt.sign({ id: IDuser },KEY_SECRETE,{expiresIn:7200});
        return serverResponse(res,200,{message:token});
     
    }catch(e){

    return serverResponse(res,500,{message:"the register failed "})

   }
}

 return serverResponse(res,500,{message:"the user alreadi exist"});

})


router.post("/getUserName", async (req,res)=>{

    
    try{

        const token=req.headers['x-access-token'];

        if(!token){

            return serverResponse(res,500,{message:"no token"});
        }else{

                const decoded = jwt.verify(token,KEY_SECRETE);
                console.log(decoded.id);
                const user= await UserModel.findById({_id:decoded.id})
                return serverResponse(res,200,user);

        }
    }catch(e){

        console.log(e);
        serverResponse(res,500,{message:"internal error occured"+e});
    }

})



module.exports =router;