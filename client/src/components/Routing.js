import React from 'react'
import { useState ,useEffect}  from 'react';
import { BrowserRouter, Route, Routes ,Link } from 'react-router-dom'
import App from '../App';
import  Cart  from './Cart';
import  CarriageContext from '../context/CarriageContext';
import Formcontrole from './FormControle';
import ProductDetaile from './ProductDetaile';
import NavBar from './NavBar';

const Routing = () => {


    //with the usecontext i can import the carriage state to every compomnent in my app
    const [carriage,setCarriage]=useState([]);
    const [tempData,settempData]=useState([]);
    const [data,setData]=useState([]);
    const [options,setOptions]=useState(null);

    async function getDataFromApi(){

    try{
      
      const response =await fetch("http://localhost:7000/api");
      const data =  await response.json();
      const categories = data.map(p => p.category)
       .filter((value, index, array) => array.indexOf(value)===index);
      //whene he finish fetch the data he change the data and render the page one more time

      //i initial te data and temp data
      setData(data);
      settempData([]);
      setOptions(categories);
  
      console.log('data',data);
      console.log('options',categories);
    }catch{
      console.log("the api not work or an other errro");
    }
  
   }



   useEffect(()=>{

    getDataFromApi();

   },[]);

    
  return (
    <CarriageContext.Provider value={{carriagekey:carriage,setcarriagekey:setCarriage ,dataKey:data,setDataKey:setData}}>

    <BrowserRouter>
    
      <NavBar />
    
     <Routes>

        <Route path='/' element={<App tempData={tempData} settempData={settempData} options={options} data={data} setData={setData}/>} />
        <Route path='Formcontrole' element={<Formcontrole options={options} data={data} setData={setData}/>} />
        <Route path='/products/:id' element={<ProductDetaile data={data}/>} />

     </Routes>
   </BrowserRouter>

   </CarriageContext.Provider>
  )
}

export default Routing;