
import { useState ,useEffect}  from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import "../filescss/Register.css"

const Login =({user,setUser})=>{

    const navigate=useNavigate()
    const [userName,setUserName]=useState('');
    const [mail,setMail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError] =useState('');
    
    


    useEffect(()=>{

        console.log(userName);
        console.log(mail);
        console.log(password);
    },[userName,mail,password])

    function RegisterUser(e){

        const newUser={
            userName,
            password
        }
       console.log(newUser);

        axios.post(`https://my-shop-xh1x.onrender.com/api/auth/login`,  newUser )
            .then(res => {
              console.log("respone",res);
              console.log("respone",res.data.user);
              window.localStorage.setItem("x-access-token",res.data.message);
              setUser(res.data.user);
              navigate('/');
            }).catch(e=>{

                setError(e.response.data.message)

            });

    }

    return(

        <div className='RegisterPage'>

             <div className="Image">
            <img src="https://st2.depositphotos.com/4035913/6124/i/600/depositphotos_61243831-stock-photo-letter-s-logo.jpg"  alt="Logo Stock Photos, Royalty Free Logo Images | Depositphotos" ></img>
               
            </div>

            <div className="UserName">
                <label>userName</label>
                <input onChange={(e)=>setUserName(e.target.value)}></input>
            </div>

            <div className="password">
                <label>password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            </div>

            <div className='buttonRegister'>
                <button onClick={(e)=>RegisterUser(e)}>Register</button>
                <button className="buttontoRegister" onClick={()=>navigate('/register')}> new user ?</button>
            </div>

            <div className="error">
               <p>{error}</p>
            </div>
        </div>
    )

}


export default Login;