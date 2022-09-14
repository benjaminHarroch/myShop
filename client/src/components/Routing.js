import React from 'react'
import { useState ,useEffect}  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import App from '../App';
import  CarriageContext from '../context/CarriageContext';
import Formcontrole from './FormControle';
import ProductDetaile from './ProductDetaile';
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login'
import ShopCart from './ShopCart';

const Routing = () => {


    //with the usecontext i can import the carriage state to every compomnent in my app
    const [carriage,setCarriage]=useState([]);
    const [tempData,settempData]=useState([]);
    const [data,setData]=useState([]);
    const [options,setOptions]=useState(null);
    const [user,setUser] =useState('');

    async function getNameFromUser(){

      const token=window.localStorage.getItem("x-access-token");
      {token&&axios.post(`https://my-shop-xh1x.onrender.com/api/auth/getUserName`, {},{ headers: {"x-access-token":`${window.localStorage.getItem("x-access-token")}`}})
            .then(res => {
              console.log(res);
              setUser(res.data);              

            }).catch((e=>{

                    console.log('error',e); 
            }));}

    }

    async function getDataFromApi(){

    try{
      
      const response =await fetch("https://my-shop-xh1x.onrender.com/api");
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
    getNameFromUser();
   },[]);

    
  return (
    <CarriageContext.Provider value={{carriagekey:carriage,setcarriagekey:setCarriage ,dataKey:data,setDataKey:setData}}>

    <BrowserRouter>
    
      <NavBar user={user} setUser={setUser}/>
    
     <Routes>

        <Route path='/' element={<App tempData={tempData} settempData={settempData} options={options} data={data} setData={setData} user={user}/>} />
        <Route path='/Formcontrole' element={<Formcontrole options={options} data={data} setData={setData}/>} />
        <Route path='/products/:id' element={<ProductDetaile data={data}/>} />
        <Route path='/Register' element={<Register />} />
        <Route path='/login' element={<Login user={user}setUser={setUser} />} />
        <Route path='/shopCart' element={<ShopCart />} />

     </Routes>
   </BrowserRouter>

   </CarriageContext.Provider>
  )
}

export default Routing;