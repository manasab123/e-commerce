import React, { useEffect, useState } from 'react'
import Items from '../Items/Items'
import './NewCollections.css'


const NewCollections = () => {
  const[new_collections,setNew_Collection]=useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_Collection(data))
  },[])
  return (
  <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className="collection">
          {new_collections.map((item,i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          })}
        </div>
  </div>
  )
}

export default NewCollections
