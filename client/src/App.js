import React, { useState , useEffect} from 'react';
import './App.css';
import Header from '../src/components/Header';
import Products from './components/Products';
import LoadingPage from './components/LoadingPage';



function App({tempData,settempData,options,data,setData}) {


console.log('data: ',data);
console.log('temp',tempData.length);
console.log("tempData :  ",tempData);

  return (

    <div className="App">

    <Header
    tmpData={tempData?tempData:[]}
    settempData={settempData}
    options={options?options:[]}
    data={data}
    setData={setData}
    />

     {(tempData.length>0)?(tempData.length>0?<Products data={tempData} />:<LoadingPage />):(data.length>0?<Products data={data} />:<LoadingPage />) }
    
    </div>

  );
}

export default App;