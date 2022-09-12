
import { useState ,useEffect}  from 'react';
import axios from 'axios';

const Login =()=>{


    const [userName,setUserName]=useState('');
    const [mail,setMail]=useState('');
    const [password,setPassword]=useState('');
  


    useEffect(()=>{

        console.log(userName);
        console.log(mail);
        console.log(password);
    },[userName,mail,password])

    function RegisterUser(e){

        const newUser={
            userName,
            mail,
            password
        }
       console.log(newUser);

        axios.post(`http://localhost:7000/api/auth/login`,  newUser )
            .then(res => {
              console.log(res);
              window.localStorage.setItem("x-access-token",res.data.message);
            })

    }

    return(

        <div className='RegisterPage'>

            <div className="UserName">
                <label>userName</label>
                <input onChange={(e)=>setUserName(e.target.value)}></input>
            </div>

            <div className="mail">
                <label>mail</label>
                <input onChange={(e)=>setMail(e.target.value)}></input>
            </div>

            <div className="password">
                <label>password</label>
                <input onChange={(e)=>setPassword(e.target.value)}></input>
            </div>

            <div className='buttonLogIn'>
                <button onClick={(e)=>RegisterUser(e)}>Register</button>
            </div>
        </div>
    )

}


export default Login;