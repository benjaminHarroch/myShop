
import React from 'react';
import {useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import CarriageContext from '../context/CarriageContext';
import "../filescss/productsDetaile.css";
import Popup from './Popup';


function ProductDetaile({data}) {

    const { id } = useParams();
    const {carriagekey,setcarriagekey}=useContext(CarriageContext);
    const token=window.localStorage.getItem("x-access-token");
    const elementWithThisID=data.find(element => element._id === id)

    function searchInCarriage(id){

      //console.log(element.id);
      let foundIndex=carriagekey.findIndex((item)=>item.element._id===id);

      if(foundIndex===-1){
        setcarriagekey((prev)=>[...prev,{amount:1,elementWithThisID}]);

      }else{

        //if you want copy the array  so copy them in a temp variable 
        //and after that add to setCarriage
        const newCarriage = [...carriagekey]
        newCarriage[foundIndex].amount++
        setcarriagekey(newCarriage)
        //console.log('we are here');
      }
    }
    

    
    
  return (

     <div className="container">


       <div className='part1'>

         <img src={elementWithThisID.image}></img>

          </div>
        
        <div className='part2'>

          <div><h3>{elementWithThisID.title}</h3></div>

          <div><h1>{elementWithThisID.price}$</h1></div>

          <div><p>{elementWithThisID.description}</p></div>

          <div className='buttonDiv1'>{token?<button onClick={()=>searchInCarriage(id)}>add to bucket</button>:<Popup styleobj={{color:"white",padding:"15px"}}/>}</div>

         </div>

     </div>


  )
}

export default ProductDetaile;