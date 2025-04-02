import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Items from '../Components/Items/Items'
import './CSS/ShopCattegory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { Link } from 'react-router-dom'

const ShopCattegory = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
        <img className='shop-category-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexsort">
          <p>
            <span>Showing 1-{props.category.length}</span> out of {all_product.length} products
          </p>
          <div className="shopcategory-sort">
            sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {all_product.map((item ,i )=>{
            if (props.category===item.category){
              return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else {
              return null;
            }
          })}
        </div>
        <Link style={{textDecoration:"none"}} to="/exploremore"><div className="loadmore">Explore More</div></Link>
    </div>
  )
}

export default ShopCattegory
