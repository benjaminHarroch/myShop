import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../filescss/Register.css"



const Register =()=>{


    const [userName,setUserName]=useState('');
    const [mail,setMail]=useState('');
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');



    useEffect(()=>{

        console.log(userName);
        console.log(mail);
        console.log(password);
        console.log(password2);
    },[userName,mail,password2,password])

    function RegisterUser(e){

        const newUser={
            userName,
            mail,
            password
        }
       console.log(newUser);
        axios.post(`https://my-shop-xh1x.onrender.com/api/auth/register`,  newUser )
            .then(res => {
              console.log(res);
              console.log(res.data);
            })

    }

    return(

        <div className='RegisterPage'>

            <div className="Image">
            <img src="https://st2.depositphotos.com/4035913/6124/i/600/depositphotos_61243831-stock-photo-letter-s-logo.jpg"  alt="Logo Stock Photos, Royalty Free Logo Images | Depositphotos" ></img>
               
            </div>

            <div className="UserName">
                <label>userName : </label>
                <input onChange={(e)=>setUserName(e.target.value)}></input>
            </div>

            <div className="mail">
                <label>mail :</label>
                <input onChange={(e)=>setMail(e.target.value)}></input>
            </div>

            <div className="password">
                <label>password:</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            </div>

            <div className="password2">
                <label>passord varification :</label>
                <input type="password" onChange={(e)=>setPassword2(e.target.value)}></input>
            </div>

            <div className='buttonRegister'>
                <button onClick={(e)=>RegisterUser(e)}>Register</button>
            </div>
        </div>
    )

}


export default Register;