

import React, { useContext, useEffect ,useState} from 'react';
import { useNavigate } from 'react-router';
import Cart from './Cart';
import "../filescss/NavBar.css";
import CarriageContext from '../context/CarriageContext';
import Logout from './Logout';



const NavBar=({user,setUser})=>{

    const navigate =useNavigate();
    const {carriagekey} =useContext(CarriageContext);



    //////////
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        //name of set interval is run on the first render on dont stop until the componet onmount
      const interval = setInterval(() => setValue(new Date()), 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
//////////////////////////////////  
     



    return(


        <div className='containeNavBar'>

            <div className='iconShopingCart'>

           {carriagekey.length>0&& <div className='number'>{carriagekey.length}</div>}
            <Cart /> 

            </div>

           <div className='navigetionBarNavBar'>

              {user!=''?<Logout user={user}  setUser={setUser} />:<button className='navigateButtonNavBar' onClick={()=>{navigate('/login')}}> login </button>}
              <button className='navigateButtonNavBar' onClick={()=>{navigate('/FormControle')}}> Controle </button>
              <button className='navigateButtonNavBar' onClick={()=>{navigate('/')}}> Home </button>

           </div>
          
           <div className='clockNavBar'>
            <p> {value.toJSON().slice(0,10)+ " "+ value.toJSON().slice(11,16)}</p>
              
            </div>
        

        </div>
    )


}



export default NavBar;