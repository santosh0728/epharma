import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import { addToCart, addToWishList } from '@/redux/reducerSlice/products'
import Categories from '../components/Categories'


function CategoriedProducts() {

  const router = useRouter()
  const category = router.query.category;
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products-by-category/${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />

      <h1 style={{
        marginLeft: '45%',
        marginTop: '3vh'

      }}>{category}</h1>
      <div className='categoried-products'>
        <div className='component'>
          <Categories />
        </div>

        <div className='products'>
          {
            products.length > 0 ? (
              <div>

                {products.map((item) => {
                  return (
                    <>
                      <div className='card'>

                        <Image class="w-full h-full object-cover"
                          src={'http://localhost:5000/product-img/' + item._id}
                          alt="F" width={300} height={400}
                        />
                        <h1>{item.productName}</h1>

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
            ) : "No products in this category"
          }

        </div>
      </div>
    </>
  )
}

export default CategoriedProducts
