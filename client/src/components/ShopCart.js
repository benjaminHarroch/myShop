import {useContext} from 'react';
import CarriageContext from '../context/CarriageContext';
import  '../filescss/shopCart.css';



const ShopCart = ()=>{
     

    let total=0

    const {carriagekey}=useContext(CarriageContext);

    carriagekey.forEach(item => {

        total=(item.amount*item.element.price)+total;
        
    })


    return (

        <div className='shopCart'>

           <div className='productsChoosen'>
            

            <h3> {total===0?"go choose a products ": "Bag"} </h3>
            
             {carriagekey?.map((item)=>{
                         
                         
            
                           return (

                                       <div className='productsChoosenElement'>     
                                           <div className='cardImage'> <img src={item.element.image} alt="something"></img> </div>
                                           <div className='cardcategorydescription'>
                                              <div className='category'> <p>{item.element.category}</p></div>
                                              <div className='description'> <p>{item.element.description}</p> </div>
                                              <div className='cardPrice'> <p>{item.element.price} $</p></div>
                                           </div>

                                        </div>
  
                          )



            })}
        </div>

        {total!=0&&<div className='Total'>

            <div><h3> Summary</h3></div>

            <div><h5>the total is : {total} $</h5></div>

            <div><button>pay now</button></div>

        </div>}


            
        </div>
    )


}

export default ShopCart;