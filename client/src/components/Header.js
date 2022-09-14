
import { useEffect } from "react";
import RangeSlider from './RangeSlider'

// ----- css ----- //
import "../filescss/header.css";

//------material UI -------//
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const Header = ({tempData,settempData,options,data,user})=>{


  const handleSteOption=(value)=>{

    if(value==="/"){
      settempData([]);
      return;

    }else{

      settempData(()=> data.filter((item)=>item.category===value));
      }
    }


    return (

         <nav className="product-filter">
                   <h1 style={{"color":"cornflowerblue", "font-weight":"600"}}>{user?"hello " +user.userName:"BRANDS-SHOP"}</h1>

              <div className="sort">
                    <div className="collection-sort">
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                       <InputLabel id="demo-simple-select-label">filter:</InputLabel>
                        <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         label="filter by:"
                         onChange={(e) => handleSteOption(e.target.value)}
                        >

                        <MenuItem value="/">All items</MenuItem>
                        {options?options.map((item)=>{
                         return(  <MenuItem value={`${item}`}>{item}</MenuItem>)}):console.log('nothing')}


                     </Select>
                    </FormControl>
                      </div>

                <div className="Slider"> <label>products with price between :</label><RangeSlider tempData={tempData} settempData={settempData} data={data}/></div>
             </div>
         </nav>

    )

}


export default Header;


/*

/*

  <select onChange={(e)=>handleSteOption(e.target.value)}>
            
                       <option value="/">All items</option>
                       {options?options.map((item)=>{
                        return( <option value={`${item}`}>{item}</option>)}):console.log('nothing')}
 
                       </select>

                       */


                       /*
                     <FormControl sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-label">filter by:</InputLabel>
                         <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           label="filter by:"
                           onChange={(e)=>handleSteOption(e.target.value)}
                          >
                           <MenuItem value={/}>All item</MenuItem>

                          {options? options.map((item)=>{ <MenuItem value={item}>{item}</MenuItem> }:{console.log('nothing')})*/
