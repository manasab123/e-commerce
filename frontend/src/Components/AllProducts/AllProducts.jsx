import React, { useEffect, useState } from 'react'
import './AllProducts.css'

import Items from '../Items/Items'

const AllProducts = () => {
  const [all_product, setAll_product]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setAll_product(data));
  },[])
  return (
    <div className='allProducts'>
    <h1>EXPLORE MORE</h1>
      <hr/>
      <div className="allProducts-items">
        {all_product.map((item,i)=>{
          return <Items Key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default AllProducts
