import React, { useContext,useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import delete_icon from '../Assets/delete_icon.jpg'
import {Link} from 'react-router-dom'

const CartItems = () => {
      const {getTotalCartAmount,getTotalCartItems,all_product , cartItems, removeFromCart}= useContext(ShopContext);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

    const applyPromoCode = async () => {
      try {
        const response = await fetch('http://localhost:4000/validatepromocode', {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ promocode: promoCode.trim() }) // Send promo code in the request body
        });
    
        const responseData = await response.json();
        
        if (responseData.success) {
          setDiscount(responseData.discount);
          setError('');
        } else {
          setError(responseData.message);
          setDiscount(0);
        }
      } catch (error) {
        console.error("Error validating promo code:", error);
        setError("Something went wrong. Please try again.");
      }
    };
    
  const totalAmount = getTotalCartAmount();
  const discountedTotal = totalAmount - (totalAmount * discount) / 100;
  const cartitems = getTotalCartItems();
if (cartitems > 0){
  return (
    <div className='Cartitems'>
      <div className="Cartitems-main">
        <p>Products</p>
        <p>Tittle</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
        {all_product.map((e) => {
            if(cartItems[e.id]>0){
                return(
                    <div>
                    <div className="Cartitems-format Cartitems-main">
                    <img src={e.image} alt="" className='Cartitems-product_icon' />
                    <p>{e.name},{e.size}</p>
                    <p>₹{e.new_price}</p>
                    <button className='Cartitems-quantity'>{cartItems[e.id]}</button>
                    <p>₹{e.new_price*cartItems[e.id]}</p>
                    <img src={delete_icon} alt="" onClick={()=>{removeFromCart(e.id)}} className='Cartitems-product_remove'/>
                </div>
                <hr/>
              </div>
                )
            }
            return null;
        })}
      
        
        <div className="Cartitems-down">
          <div className="Cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="Cartitems-total-items">
                <p>Sub Total</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className="Cartitems-total-items">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr/>
              <div className="Cartitems-total-items">
                <p>Coupon Discount</p>
                <p>{discount}% ₹{totalAmount-discountedTotal}</p>
              </div>
              <hr/>
            </div>
            <div className="Cartitems-total-items">
              <h3>Total</h3>
              <h3>{discountedTotal}</h3>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>

         <div className="Cartitems-promocode">
          <p>Enter your promo code</p>
          <div className="Cartitems-promocode-box">
            <input type="text" placeholder='Promo Code' value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())}/>
            <button onClick={applyPromoCode}>Submit</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  )
}
else{
  return(
    <div className="emptycart">
      <h6>Looks like you have not added products to cart</h6>
      <img src="" alt="" />
      <h1>Your Cart Is Empty</h1>
      <p><span>Add products to your cart.</span><Link to="/exploremore">Add Now.</Link></p>
    </div>
  )
}
}

export default CartItems
