
const express = require('express');
const jwt =require('jsonwebtoken');
const serverResponse=require('../utilsServer/serverResponse');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserModel=require("../models/User");



const router =express.Router();
require("dotenv").config();

const {KEY_SECRETE}=process.env;


const validUserandPasswordForLogin= async (userName,password)=>{
    try{
        const response = {isSuccess: true, data:'', failureMessage:''};
        const user=await UserModel.findOne({userName});
    
        if(user){
            // Load hash from your password DB.
            const match =  await bcrypt.compare(password, user.password)
                   if(match){
                       console.log('user',user)
                    response.data=user;
                    return response;
                   }else{
                     response.isSuccess=false
                     response.failureMessage='the password is not good'
                  }
           }else{
               response.isSuccess=false;
               response.failureMessage= 'the user not exist'
           }
    } catch(e){
        console.log(e)
    }
 
 
}

const validUserandPasswordForRegister= async (userName,password)=>{

    console.log('userName',userName);
    const user=await UserModel.findOne({userName:userName});
    
         return user;

}

//this is a coutinue router to the router in the app.use
router.post('/login' ,async (req,res)=>{

    const userName=req.body.userName;
    const password=req.body.password;
    
    try{

        const response = await validUserandPasswordForLogin(userName, password);

         if(response.isSuccess){
            console.log('respnse', response)
        
          const IDuser=response.data._id;
          console.log('2');

          var token = jwt.sign({ id: IDuser },KEY_SECRETE,{expiresIn:7200});
          console.log('3');
          return serverResponse(res,200,{message:token,user:response.data});
       }
     
    }catch(e){

        return serverResponse(res,500,{message:"the login failed "})
  
    }
})


router.post('/register' ,async (req,res)=>{

    const userName=req.body.userName;
    const password=req.body.password;

    const mail= req.body.mail;
    const user=await validUserandPasswordForRegister(userName,password);

    if(!user){

        try{

        bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.

            if(err){
                return serverResponse(res,500,{mesage:"an error uccured with your password"})
            }
             //if the user not exist so save the user in the data base and return token
                 const newUser=await  new UserModel({userName:userName,password:hash,mail:mail});
                 await newUser.save();
                 
                const IDuser=newUser._id;

                 var token = jwt.sign({ id: IDuser },KEY_SECRETE,{expiresIn:7200});
                return serverResponse(res,200,{message:token});
        });
     
    }catch(e){

    return serverResponse(res,500,{message:"the register failed "})

   }
}
   else{

      return serverResponse(res,500,{message:"the user alreadi exist"});

    }

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