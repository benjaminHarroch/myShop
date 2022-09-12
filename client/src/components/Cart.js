import React from 'react'
import { useContext ,useState } from 'react'
import CarriageContext from '../context/CarriageContext';
import  '../filescss/cartcss.css'
import axios from 'axios';


///// naterial UI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Cart() {


  //////function for componet  from material UI 

    const [stateDrawer, setStateDrawer] = useState(false);
  

    ///////////////////////////////



    const {carriagekey,setcarriagekey}=useContext(CarriageContext);
    

     function searchInBucketandDelete(elementId){


        let foundIndex=carriagekey.findIndex((item)=>item.element._id==elementId);
        console.log('asfsafas',foundIndex);
        if(foundIndex===-1){
  
          console.log("the product not exists not possible option");

        }else{
  
          //if you want copy the array  so copy them in a temp variable 
          //and after that add to setCarriage
          
          const newCarriage = [...carriagekey]
          newCarriage.splice(foundIndex,1);
          setcarriagekey(newCarriage)
          //console.log('we are here');
        }
    }

  return (

    <div>

       <IconButton color="primary" aria-label="add to shopping cart" font-size="large" onClick={()=>setStateDrawer(true)} >
        <ShoppingCartIcon style={{ fontSize: 50 }} />
      </IconButton>
      
          <Drawer
            anchor='left'
            open={stateDrawer}
            onClose={()=>setStateDrawer(false)}
           
          >

{  carriagekey.length>0?carriagekey.map((item)=> {
    
    
    return(

     <div className='cartProducts'>


         <div className='cardPart1'> 

              <div className='cardImage'> <img src={item.element.image} alt="something"></img> </div>
              <div className='cardcategorydescription'>
                  <div className='category'> <p>{item.element.category}</p></div>
                  <div className='description'> <p>{item.element.description}</p> </div>
                  <div className='cardPrice'> <p>{item.element.price}</p></div>
                  <div className='amount'> <p>{item.amount}</p></div>
              </div>
         </div>

          <div className='cartPart2'> 
                <div className='cardDeleteButton'> <button id={`${item.element._id}`} onClick={(e)=>searchInBucketandDelete(e.target.id)}><span id={`${item.element._id}`}  className="material-icons">delete_forever</span></button></div>
                <div className='quantity'> <p></p></div>
                <div className='total'> <p>{item.amount*item.element.price}</p></div>

          </div>


     </div>
 )

}
):<h1 className='emptyDrawer'>GO SHOOSE PRODUCTS </h1>
}
   
          </Drawer>
      
    </div>


  )}

export default Cart;
