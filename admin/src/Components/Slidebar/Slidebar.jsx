import React from 'react'
import './Slidebar.css'
import {Link} from 'react-router-dom'

const Slidebar = () => {
  return (
    <div className='slidebar'>
        <Link to={'/addproduct'} style={{textDecoration: "none"}}>
        <div className="slidebar-item">
            <img src="" alt="" />
            <p>Add product</p>
        </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration: "none"}}>
        <div className="slidebar-item">
            <img src="" alt="" />
            <p>List product</p>
        </div>
        </Link>
        <Link to={'/popularproduct'} style={{textDecoration: "none"}}>
        <div className="slidebar-item">
            <img src="" alt="" />
            <p>Popular product</p>
        </div>
        </Link>
    </div>
  )
}

export default Slidebar
