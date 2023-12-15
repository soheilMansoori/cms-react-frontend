import React, { useState } from 'react'
import './ProductsPage.css'
import AddNewProducts from '../../Components/AddNewProducts/AddNewProducts'
import ProductsTable from '../../Components/ProductsTable/ProductsTable'
export default function ProductsPage() {
  // HOOKs
  const [products, setProducts] = useState([])


  function getAllProducts() {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data.reverse())
        
      })
      .catch(error => console.log(error))
  }


  return (
    <>
      <AddNewProducts getAllProducts={getAllProducts}/>
      <ProductsTable getAllProducts={getAllProducts} products={products} />
    </>
  )
}
