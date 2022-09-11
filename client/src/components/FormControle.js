import React, { useState, useEffect } from 'react';
import "../filescss/FormControle.css"
//import TextField from '@mui/material/TextField';

//material ui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { color } from '@mui/system';




 


 const Formcontrole =({options,data,setData})=>{


    const [image,setImage] =useState('');
    const [category,setCategory] =useState('');
    const [description,setDescription] =useState('');
    const [price,setPrice] =useState('');
    const [title,setTitle] =useState('');
    const [error,setError] =useState('');
    ///need the flage because set state work like a asyncronise system and before he finisih to set the state
    //the code continue rapidly and finish to push a new product into the state.
    let flage =false;

    function handleChange(){

        setError('');
        

        if(description.length===0||title.length===0||image.length===0||price.length===0||category.length===0||category==="/"){

            setError("   one of the filed is empty");
            flage=true;
        }
        if(description.length>30){

            setError((prev)=>prev + " , description field is to longer.");
            flage=true;
        }
        if(title.length>30){

            setError((prev)=>prev + ",  title field is to longer.");
            flage=true;
        }
        if(!(price>=0&&price<10000)){
            
            if(isNaN(price)){
                setError((prev)=>prev + ", price recaive only number.");
            }else{
             setError((prev)=>prev + ", please cheke a price cheapoer");
            }
            flage=true;
        }
        if(description.length===0||title.length===0||image.length===0||price.length===0||category.length===0){

           // setError("one of the filed is empty");
           
        }

        if(flage){
            return ;
        }else{
            let newProducts={
                category:category,
                description:description,
                id:data.length+1,
                image:image,
                price:price,
                title:title
            }
            //you cant use push because push return The new length property of the object
            setData((prev)=>[...prev,newProducts]);
            setError("you success to upload a new product");
        }
        
        setCategory("/");
        setDescription("");
        setPrice("");
        setTitle("");
        setImage("");
    }

  
    useEffect(()=>{

        console.log(image);
        console.log(category)
        console.log(description)
        console.log(title)
        console.log(price)
    },[image,category,description,title,price]);
    

    return(
        

        <div className='formControle'>

                <div className='imageDiv'>

                 <label>enter new URL : </label>
                 <input  value={image}  placeholder="url.." onChange={(e)=>setImage(e.target.value)} onFocus={(e) => e.target.placeholder = ''}/>

                </div>

                <div className='descriptionDiv'>

                 <label> enter description of product : </label>
                 <input type="text" value={description} placeholder="descriptiom.." onChange={(e)=>setDescription(e.target.value)} onFocus={(e) => e.target.placeholder = ''}/>
                
                </div>

                <div className='priceDiv'>

                 <label>enter price of product : </label>
                 <input type="text" value={price} placeholder="price.." onChange={(e)=>setPrice(e.target.value)} onFocus={(e) => e.target.placeholder = ''} />

                </div>


                <div className='titleDiv'>

                 <label>enter title please : </label>
                 <input type="text" value={title} placeholder="title.." onChange={(e)=>setTitle(e.target.value)} onFocus={(e) => e.target.placeholder = ''}/>

                </div>

                <div>

                   <Box sx={{ minWidth: 120 }}>
                         <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">categories</InputLabel>
                            <Select
                                className='.MuiSelect-select'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="categorie"
                                onChange={(e)=>{setCategory(e.target.value);}}
                             >
                                 <MenuItem value={"/"}>----------</MenuItem>
                                {options?.map((item)=><MenuItem value={item}>{item}</MenuItem>)}

                          </Select>
                        </FormControl>
                     </Box>

                </div> 

                <div>
                    <button className="buttonDiv" onClick={()=>{handleChange()}}>add products</button>
                </div>

                <div className='errorDiv'>
                    <p style={!flage ? {color:"green"} : { color: "red"}}>{error}</p>
                </div>

        </div>


    )
 }


 export default Formcontrole;



 /*
 <div className='categoryDiv'>

                   <label>choose a category : </label>
                   <select onChange={(e)=>setCategory(e.target.value)}>
                   <option value="/"  >--------</option>
                   {options?.map((item)=><option value={`${item}`}>{item}</option>)}
                   */