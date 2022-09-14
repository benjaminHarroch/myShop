
import * as React from 'react';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({tempData, settempData,data}) {


  const [value, setValue] = React.useState([1, 1000]);

  function sortData(value){

    tempData?settempData((prev)=>prev.filter(element => {

                   if(element.price > value[0] && element.price < value[1]){
                    return true;
                   }
    
    })):settempData(()=>data.filter(element => {

      if(element.price > value[0] && element.price < value[1]){
       return true;
      }

}))


  }

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    sortData(value);
  },[value])

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={1}
        max={1000}
        step={20}
      />
    </Box>
  );
}