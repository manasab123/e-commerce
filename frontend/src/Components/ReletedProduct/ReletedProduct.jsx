import React, { useEffect, useState } from 'react'
import './ReletedProduct.css'
import Items from '../Items/Items'

const ReletedProduct = () => {
  const[popular,setPopular]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/popular')
    .then((resopnse)=>resopnse.json())
    .then((data)=>setPopular(data))
  },[])
  return (
    <div className='ReletedProduct'>
      <h1>RELATED PRODUCTS</h1>
      <hr/>
      <div className="ReletedProduct-item">
        {popular.map((item,i)=>{
          return <Items Key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default ReletedProduct
