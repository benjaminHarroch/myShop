import { useState ,useEffect}  from 'react';
import { useNavigate } from 'react-router';


const Logout=({user,setUser})=>{

    const navigate=useNavigate();
    

    return(

        

            <button className='navigateButtonNavBar' onClick={()=>{
                localStorage.clear()
                setUser('');
            }}> logout</button>

        
    )

}


export default Logout;