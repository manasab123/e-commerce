import React, { useContext ,useState} from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'
const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} =useContext(ShopContext)
    
    const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size); // ✅ Save selected size
  };
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
        <img src={product.image} alt="" />
        <img src={product.image} alt="" />
        <img src={product.image} alt="" />
        <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className="productdisplay-mainimg" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-price">
            <div className="productdisplay-price-old">
                ₹{product.old_price}
            </div>
            <div className="productdisplay-price-new">
                ₹{product.new_price}
            </div>
        </div>
        <div className="productdisplay-description">
            ✔ Premium Fabric - Soft, skin-friendly, and long-lasting <br/>
            ✔ Trendy Design - Striped pattern with stylish flutter sleeves <br/>
            ✔ Perfect Fit - Available in a range of sizes for all body types <br/>
            ✔ Versatile Wear - Ideal for casual outings, office meetings, or evening events <br/>
            ✔ Easy Care - Machine washable, wrinkle-resistant, and fade-proof <br/>    
         </div>
        <div className="productdisplay-size">
            <h1>Select Size</h1>
            {/* <div className="productdisplay-sizes">
                <div className='selected'>XS</div>
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
            </div> */}
                  <div className="productdisplay-sizes">
        {["XS", "S", "M", "L", "XL"].map((size) => (
          <div
            key={size}
            className={selectedSize === size ? "selected" : ""}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </div>
        ))}
      </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-category"><span>Category :</span> {product.category}</p>
        <p className="productdisplay-category"><span>Tags :</span>Latest ,Trending</p>
        <p className="productdisplay-category"> Fast Delivery | Easy Returns | Secure Payment</p>
      </div>
    </div>
  )
}

export default ProductDisplay
