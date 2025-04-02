import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import Breadcrumb from '../Components/Breadcrumb/Breadcrumb';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Description from '../Components/Description/Description';
import ReletedProduct from '../Components/ReletedProduct/ReletedProduct';
const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product =all_product.find((e)=>e.id===Number(productId));
  return (
    <div className='products'>
      <Breadcrumb product={product}/>
      <ProductDisplay product={product}/>
      <Description />
      <ReletedProduct/>
    </div>
  )
}

export default Product
