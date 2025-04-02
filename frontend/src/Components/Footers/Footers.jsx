import React from 'react'
import './Footers.css'
import logo2 from '../Assets/logo2.webp'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from'../Assets/whatsapp_icon.png'

const Footers = () => {
  return (
    <div className='footers'>
      <div className="footerlogo">
          <img src={logo2} alt="" width={50} height={45} />
           <p>TrendLine</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-icons">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pintester_icon} alt="" />
        </div>
        </div>
        <div className="footer-copyright">
          <hr/>
          <p>Copyright @ 2025 - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footers
