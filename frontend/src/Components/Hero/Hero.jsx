import React from 'react'
import './Hero.css'
import heroo from '../Assets/heroo.png'

// hero component
const Hero = ({onButtonClick}) => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS Only !! </h2>
            <div>
            <p>New</p>
            <p>Collections</p>
            <p>For Everyone</p>
            </div>
            <div className="hero-latest-btn">
                <button onClick={onButtonClick}>New Collection -</button>
            </div>
        </div>
        <div className="hero-right">
           <img src={heroo} alt=""/>
        </div>
    </div>
  )
}

export default Hero
