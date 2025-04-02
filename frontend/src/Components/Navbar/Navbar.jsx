import React, { useContext, useState } from 'react'
import './Navbar.css'
import cart from '../Assets/cart.png'
import { Link } from 'react-router-dom'
import logo2 from '../Assets/logo2.webp'
import { ShopContext } from '../../Context/ShopContext'

//navigation component (navbar of the application)
const Navbar = () => {
  const [menu, setMenu] = useState("shop") //
  const { getTotalCartItems } = useContext(ShopContext) //to display the total items in the cart

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        {/* logo and brandname */}
        <img src={logo2} alt="" width={50} height={50} />  
        <Link style={{ textDecoration: "none" }} to="/"><p>TrendLine</p></Link>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: "none" }} to="/">Home{menu === "shop" ? <hr /> : <></>}</Link></li>
        <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: "none" }} to="/mens">Mens{menu === "mens" ? <hr /> : <></>}</Link></li>
        <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: "none" }} to="women">Womens{menu === "womens" ? <hr /> : <></>}</Link></li>
        <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: "none" }} to="kids">kids{menu === "kids" ? <hr /> : <></>}</Link></li>
      </ul>
      <div className='nav-login-cart'>
        {/* login and logout */} 
        {localStorage.getItem('auth-token') ? 
        <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button> 
        : <Link to="/login"><button>Login</button></Link>}
        {/* cart and cartcount */}
        <Link to="/cart"> <img src={cart} alt='' width="70" height="70" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
