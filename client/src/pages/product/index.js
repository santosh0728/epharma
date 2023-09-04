import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch } from 'react-redux'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import { addToCart, addToWishList } from '@/redux/reducerSlice/products'
import Link from 'next/link';

const ProductDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const productId = router.query.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      // Fetching product details using the "productId" parameter
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/products/${productId}`);
          const data = await response.json();
          setProduct(data.product);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      fetchProductDetails();
    }
  }, [productId]);

  return (
    <>
      <Header />
      <div className="productDetails">
        {/* Render product details here */}
        {product ? (
          <>
          <div className="content">
          <Image class="w-full h-full object-cover"
                        src={'http://localhost:5000/product-img/' + productId}
                        alt="F" width={300} height={300}
                      />
            <h1>{product.productName}</h1>
            
            <h2>Rs. {product.productPrice}</h2>
            {product.productDescription}<br/>
            <button onClick={() => dispatch(addToCart(product))}><ShoppingCartOutlined /> Add to Cart</button>
            <button onClick={()=> router.push('/cart')}>Go to Cart</button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
