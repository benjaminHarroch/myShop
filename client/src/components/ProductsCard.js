import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import '../filescss/products.css'

const ProductCard =(props)=>{
    
  const navigate=useNavigate();

    return (

    <div className="product-card">

      <div className="product-image">

        <img
         src={props.image}
         alt="something"
          />

      </div>

        <div className="product-info">

          <h5>{props.category}</h5>

          <h6>${props.price}</h6>

          <Button id={props.id} data={props.data}/>
          <button onClick={()=>navigate(`/products/${props.id}`)}>detailes</button>

        </div>
      </div>
    )
}


export default ProductCard;