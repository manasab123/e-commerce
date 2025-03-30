import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
    const [allproducts, setAllProducts]= useState([]);

    const fetchInfo = async()=>{
        await fetch('http://localhost:4000/allproducts')
            .then((res)=>res.json())
            .then((data)=>{setAllProducts(data)})
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const removeProduct =async(id)=>{
        await fetch("http://localhost:4000/removeproduct",{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

    const Popular = async (productId, isPopular) => {
        await fetch("http://localhost:4000/setpopular", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, popular: isPopular })
        });
        setAllProducts(prevProducts =>
            prevProducts.map(product =>
                product._id === productId ? { ...product, popular: isPopular } : product
            )
        );
    
    }
  return (
    <div className='listproduct'>
        <h1>Products List</h1>
        <div className="listproduct-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New price</p>
            <p>Category</p>
            <p>Remove</p>
            <p>Popular</p>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {allproducts.map((product)=>{
                return(
                    <>
                    <div key={product._id} className="listproduct-main listproduct-format">
                    <img src={product.image} alt="" className='listproduct-img' />
                    <p>{product.name}</p>
                    <p>₹{product.old_price}</p>
                    <p>₹{product.new_price}</p>
                    <p>{product.category}</p>
                    <img onClick={()=>{removeProduct(product._id)}} src={cross_icon} alt="" className="listproduct-remove" />
                    <input checked={product.popular} type="checkbox" onChange={(e)=>Popular(product._id,e.target.checked)} />
                    </div>
                    <hr />
                    </>
                )
            })}
        </div>
    </div>
  )
}

export default ListProduct
