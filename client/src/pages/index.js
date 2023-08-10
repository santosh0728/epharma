import React, {useEffect, useState} from 'react'
import Header from './components/header'
import Image from 'next/image'

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
                {item.productImage}
              <Image src={'http://localhost:5000/product-img/'+ item._id} alt="F" width={50} height={60}/>  
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