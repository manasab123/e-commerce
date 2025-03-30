import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image ,setImage] = useState(false);
    const [productDetails, setProductDetails]=useState({
        name:"",
        image:"",
        category:"",
        new_price:"",
        old_price:"",
    })
    const imagehandler=(e)=>{
        setImage(e.target.files[0]);
    }
    const changehandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const addProduct=async()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData =new FormData(); 
        formData.append('product',image);

        await fetch("http://localhost:4000/upload",{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData, 
        }).then((resp)=>resp.json())
        .then((data)=>{responseData=data})

        if(responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            await fetch("http://localhost:4000/addproduct",{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),  
            }).then((resp)=>resp.json())
            .then((data)=>{data.success?alert("product added"):alert("Failed")
    
            })
        }
    }
  return (
    <div className='addproduct'>
        <h1>Add Products</h1>
      <div className="addproduct-items">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changehandler}type="text" name="name" id="" placeholder='Enter Here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-items">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changehandler} type="text" name='old_price' placeholder='Enter Here' />
        </div>
        <div className="addproduct-items">
            <p> Offer Price</p>
            <input value={productDetails.new_price} onChange={changehandler} type="text" name='new_price' placeholder='Enter Here' />
        </div>
        </div>
        <div className="addproduct-items">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changehandler}name="category" className='addproduct-selector'>
                <option selected disabled>Select Category</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">kid</option>
            </select>
        </div>
        <div className="addproduct-items">
           <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail' alt="" />
           </label>
           <input onChange={imagehandler}type="file" name="image" id="file-input" hidden />
        </div>
        <button onClick={()=>{addProduct()}}className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
