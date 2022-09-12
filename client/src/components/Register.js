import React, { useState, useEffect } from 'react';
import "../filescss/FormControle.css"
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
        axios.post(`http://localhost:7000/RegisterApi`,  newUser )
            .then(res => {
              console.log(res);
              console.log(res.data);
            })

    }

    return(

        <div className='RegisterPage'>

            <div className="UserName">
                <label></label>
                <input onChange={(e)=>setUserName(e.target.value)}></input>
            </div>

            <div className="mail">
                <label></label>
                <input onChange={(e)=>setMail(e.target.value)}></input>
            </div>

            <div className="password">
                <label></label>
                <input onChange={(e)=>setPassword(e.target.value)}></input>
            </div>

            <div className="password2">
                <label></label>
                <input onChange={(e)=>setPassword2(e.target.value)}></input>
            </div>

            <div className='buttonLogIn'>
                <button onClick={(e)=>RegisterUser(e)}>Register</button>
            </div>
        </div>
    )

}


export default Register;