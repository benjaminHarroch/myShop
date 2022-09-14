
import { useEffect } from "react";
import RangeSlider from './RangeSlider'
import TextAnimation from "./TextAnimation";

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
                <h1 style={{"color":"cornflowerblue", "font-weight":"600"}}>{user?<TextAnimation text={"hello " + `${user.userName}`} />:<TextAnimation text={"Brands Shop"} />}</h1>

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


