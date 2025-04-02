import React,{useState,useEffect}from 'react'
import './Popular.css'
import Items from '../Items/Items'

const Popular = () => {
  const [popular,setPopular]=useState([])
  useEffect(()=>{
     fetch('http://localhost:4000/popular')
     .then((response)=>response.json())
     .then((data)=>setPopular(data))

  },[])
  return (
    <div className='popular'>
      <h1>POPULAR AMONG USERS</h1>
      <hr/>
      <div className="popular-item">
        {popular.map((item,i)=>{
          return <Items Key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
