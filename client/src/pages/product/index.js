import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { useRouter } from 'next/router';

function ProductDetail() {
  const router = useRouter();
  const { _id } = router.query;
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();

        // Find the product with the matching _id in the list
        const selectedProduct = data.find(item => item._id === _id);
        
        setProduct(selectedProduct); // Set the selected product details
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (_id) {
      fetchProducts();
    }
  }, [_id]);

  return (
    <>
      <Header />
      <div className='product-details'>
        {products ? (
          <>
            <h1>{products.productName}</h1>
            <p>{products.productDescription}</p>
            <h2>Rs. {products.productPrice}</h2>
            {/* Render other product details here */}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
