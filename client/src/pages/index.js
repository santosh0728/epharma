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
    <div className='products'>
      {
        products.length>0 ? (
          <div>
            {products.map((item)=>{
              return (
                <>
                
              <div className='card'>
               
              <Image class="w-full h-full object-cover"
               src={'http://localhost:5000/product-img/'+ item._id} 
               alt="F" width={200} height={200}/>  
             <h1>{item.productName}</h1> 
              <p>Description:{item.productDescription}</p> 
              <h2>Price:Rs.{item.productPrice}</h2>
              Category:{item.category}<br/>
             
              <button>Buy Now</button>
              </div>
              </>
              )
            })}
            </div>
        ): "loading"
      }
     
    </div>
    </>
  )
}

export default index