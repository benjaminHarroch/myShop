import React, { useContext, useEffect } from 'react';
import CarriageContext from '../context/CarriageContext';
//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



export const Button = ({id ,data}) => {


  const {carriagekey,setcarriagekey}=useContext(CarriageContext);

   function searchInCarriage(element){

      //console.log(element.id);
      let foundIndex=carriagekey.findIndex((item)=>item.element._id===element._id);

      if(foundIndex===-1){
        setcarriagekey((prev)=>[...prev,{amount:1,element}]);

      }else{

        //if you want copy the array  so copy them in a temp variable 
        //and after that add to setCarriage
        const newCarriage = [...carriagekey]
        newCarriage[foundIndex].amount++
        setcarriagekey(newCarriage)
        //console.log('we are here');
      }

  }

  

    useEffect(()=>{
        console.log(carriagekey);
    },[carriagekey])

    const foundAndAddProductToCart = (indexItem)=> {
        
        let foundElement=data.find((item)=>item._id==indexItem);
        searchInCarriage(foundElement);
    }
   


  return (

    <button  id={id} onClick={(e)=>{
       
        //console.log('id:',e.target.id);
        foundAndAddProductToCart(e.target.id);

    }}> add </button>
    
  )
}