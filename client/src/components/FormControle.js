import React, { useState, useEffect } from 'react';
import "../filescss/FormControle.css"
import axios from 'axios';
//import TextField from '@mui/material/TextField';

//material ui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



 


 const Formcontrole =({options,data,setData})=>{


    const [image,setImage] =useState('');
    const [category,setCategory] =useState('');
    const [description,setDescription] =useState('');
    const [price,setPrice] =useState('');
    const [title,setTitle] =useState('');
    const [error,setError] =useState({

        errorExist:false,
        error:''

    });
    ///need the flage because set state work like a asyncronise system and before he finisih to set the state
    //the code continue rapidly and finish to push a new product into the state.

    let flage =false;

    function handleChange(){

        console.log(window.localStorage.getItem("x-access-token"));

        setError({
            errorExist:false,
            error:''
        });

        if(description.length===0||title.length===0||image.length===0||price.length===0||category.length===0||category==="/"){

            setError({
                errorExist:true,
                error:"   one of the filed is empty"
            });
            flage=true;
        }
        if(description.length>30){

            setError((prev)=>({
                errorExist:true,
                error:prev.error+ "   the description is much longer"
            }));

            flage=true;
        }
        if(title.length>30){

            setError((prev)=>({
                errorExist:true,
                error:prev.error+ "  the title is much longer"
            }));
            flage=true;
        }
        if(!(price>=0&&price<10000)){
            
            if(isNaN(price)){
                setError((prev)=>({
                    errorExist:true,
                    error:prev.error+ "  the price is compromise only number"
                }));
            }else{
                setError((prev)=>({
                    errorExist:true,
                    error:prev.error+ "  the price is higher"
                }));
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
                image:image,
                price:price,
                title:title
            }

            
            console.log(window.localStorage.getItem("x-access-token"));
            axios.post(`https://my-shop-xh1x.onrender.com/api/product`, newProducts,{ headers: {"x-access-token":`${window.localStorage.getItem("x-access-token")}`}})
            .then(res => {

                //you cant use push because push return The new length property of the object
                setData((prev)=>[...prev,newProducts]);
                setError({
                         errorExist:false,
                         error:"you succes to add a products"
                 });

              console.log('res',res);
              console.log('res.data',res.data);

            }).catch((e=>{

                     console.log('error permision',e)
                     setError({
                     errorExist:true,
                     error:"you have noi permission for add products pleasse get login"
                     })
            }));

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
                    <p style={!error.errorExist ? {color:"green"}:{color:"red"}}>{error.error}</p>
                </div>

        </div>


    )
 }


 export default Formcontrole;

