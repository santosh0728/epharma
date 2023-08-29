import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from 'antd';
const ProductDetails = () => {
  const router = useRouter();
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
      <div classname="productDetails">
        {/* Render product details here */}
        {product ? (
          <>
          <Image class="w-full h-full object-cover"
                        src={'http://localhost:5000/product-img/' + productId}
                        alt="F" width={200} height={200}
                      />
            <h1>{product.productName}</h1>
            <p>{product.productDescription}</p>
            <h2>Rs. {product.productPrice}</h2>
            <Button>Checkout</Button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
