

import ProductsCard from "./ProductsCard";



const Products= (props)=>{

    console.log('products',props.data);

    let productarray=props.data.map((item)=>{


         return (<ProductsCard id={item._id} price={item.price} description={item.description}
                   category={item.category} image={item.image} rating={item.rating} data={props.data}/>
         )

    })


return(
    <section className="products">
     
     {
        //because the element is a react element so the power of
        //react is to understand it and show the element
        productarray
     }
     
     </section>
)}



export default Products;

