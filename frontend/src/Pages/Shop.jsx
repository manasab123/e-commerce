import React from 'react'
import { useRef } from "react";
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import NewCollections from '../Components/NewCollections/NewCollections'

const Shop = () => {
  const newCollectionsRef = useRef(null);

  const scrollToNewCollections = () => {
    newCollectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Hero onButtonClick={scrollToNewCollections}/>
      <Popular/>
      <Offers/>
      <div ref={newCollectionsRef}>
        <NewCollections />
      </div>
      <NewsLetter/>
    </div>
  )
}

export default Shop
