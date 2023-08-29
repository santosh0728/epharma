import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Image from 'next/image'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import { addToCart, addToWishList } from '@/redux/reducerSlice/products'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'



function index() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/products')
    const { data } = await res.json()
    setProducts(data)
  }


  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <>
      <Header />


      <div className='products'>
        {/* <Badge count={cartList.length}>
      <ShoppingCartOutlined style={{fontSize:'30px'}}/>
    </Badge> */}

        {
          products.length > 0 ? (
            <div>
              {/* {JSON.stringify(cartList)} */}
              {products.map((item) => {
                return (
                  <>
                    <div className='card'>

                      <Image class="w-full h-full object-cover"
                        src={'http://localhost:5000/product-img/' + item._id}
                        alt="F" width={200} height={200}
                      />
                      <h1>{item.productName}</h1>
                      <p>{item.productDescription}</p>
                      <h2>Rs.{item.productPrice}</h2>
                      <HeartOutlined onClick={() => dispatch(addToWishList(item._id))} />
                      <p>Category:{item.category}<br /></p>

                      <button onClick={() => dispatch(addToCart(item))}><ShoppingCartOutlined /> Add to Cart</button>
                      <button onClick={() => router.push(`/product?id=${item._id}`)}>
                        Buy Now
                      </button>

                    </div>
                  </>
                )
              })}
            </div>
          ) : "loading"
        }

      </div>
    </>
  )
}

export default index