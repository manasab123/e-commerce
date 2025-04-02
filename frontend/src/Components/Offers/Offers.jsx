import React from 'react'
import './Offers.css'
import hero3 from '../Assets/hero3.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offer-left">
        <h2>EXCLUSIVE Offers</h2>
        <h2>Upto 60% off</h2>
        <h4>ON ALL BEST SELLERS ONLY FOR YOU</h4>
        <button>Shop Now</button>
      </div>
      <div className="offer-right">
        <img src={hero3} alt="" />
      </div>
    </div>
  )
}

export default Offers
