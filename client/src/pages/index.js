import React, {useEffect, useState} from 'react'
import Header from './components/header'

function index() {
  const [products,setProducts]= useState([])
  const fetchProducts= async()=> {
   const res= await fetch('http://localhost:5000/products')
    const {data} =await res.json()
    setProducts(data)
  }


  useEffect(() => {
    fetchProducts()
  },[])
  return (
  <>
  <Header/>
    <div>
      {
        products.length>0 ? (
          <div>
            {products.map((item)=>{
              return <div className='card'>
              Name:{item.productName}<br/>
              Price:{item.productPrice}<br/>
              Category:{item.category}<br/>
              Description:{item.productDescription}
              </div>
            })}
            </div>
        ): "loading"
      }
     
    </div>
    </>
  )
}

export default index