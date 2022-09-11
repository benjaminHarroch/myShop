
import React from 'react';
import { useState} from 'react';
import {useParams} from "react-router-dom";
import "../filescss/productsDetaile.css";


function ProductDetaile({data}) {

    const { id } = useParams();
    
    const elementWithThisID=data.find(element => element._id === id)

    //const product=data[id-1];
    
  return (

     <div className="container">


       <div className='part1'>

         <img src={elementWithThisID.image}></img>

          </div>
        
        <div className='part2'>

          <div><h3>{elementWithThisID.title}</h3></div>

          <div><h1>{elementWithThisID.price}$</h1></div>

          <div><p>{elementWithThisID.description}</p></div>

          <div className='buttonDiv1'><button>add to bucket</button></div>

         </div>

     </div>


  )
}

export default ProductDetaile;