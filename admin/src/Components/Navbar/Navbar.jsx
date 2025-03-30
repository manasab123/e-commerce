import React from 'react'
import './Navbar.css'
import logo2 from '../../assets/image.png'
import navprofile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-logo'>
        <img src={logo2} alt="" width={50} height={50} />
        <div className="text">
        <p>TrendLine</p>
        <h6>ADMIN PANEL</h6>
        </div>
      </div>
        <img src={navprofile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar
