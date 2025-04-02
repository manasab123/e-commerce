import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCattegory from './Pages/ShopCattegory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Footers from './Components/Footers/Footers'
import banner_kids from './Components/Assets/banner_kids.png'
import banner_mens from './Components/Assets/banner_mens.png'
import banner_women from './Components/Assets/banner_women.png'
import AllProducts from './Components/AllProducts/AllProducts'
export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/mens" element={<ShopCattegory banner={banner_mens} category="men"/>}/>
        <Route path="/women" element={<ShopCattegory banner={banner_women} category="women"/>}/>
        <Route path="/kids" element={<ShopCattegory banner={banner_kids} category="kid"/>}/>
        <Route path="product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/login" element={<LoginSignup/>}/>
      <Route path="/exploremore" element={<AllProducts/>}/>
      </Routes>
      <Footers/>
      </BrowserRouter>
    </div>
  )
}
