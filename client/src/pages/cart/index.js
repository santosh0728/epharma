import React from 'react'
import Header from '../components/header'
import { useSelector,useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DeleteOutlined } from '@ant-design/icons';
import { removeFromCart } from '@/redux/reducerSlice/products';
import { initializeCartAndWishList } from '@/redux/reducerSlice/products';


function index() {
  const router=useRouter();
  const dispatch=useDispatch();
  const { cartList } = useSelector(state => state.products)
  return (
    <>
    <Header/>
    <div className='cart'>
      <h1>Cart</h1>
       {cartList.map(item => (
              <div className="cart-item" key={item._id}>
                <Image
                  className="w-full h-full object-cover"
                  src={'http://localhost:5000/product-img/' + item._id}
                  alt="F"
                  width={200}
                  height={200}
                />
                <h1>{item.productName}</h1>
                <h2>Unit Price: Rs.{item.productPrice}</h2>
                <h3>Quantity: {item.quantity}</h3>
                <DeleteOutlined onClick={()=>dispatch(removeFromCart(item))}
                style={{
                  fontSize:'25px',
                  color:'red',
                  padding:'20px',
                  marginRight:'20px',
                  marginBottom:'5px'
                }}
                />
                </div>
               
                ))}
                <div className='checkout-btn'>
                  <button>Checkout</button>
                  <button onClick={()=>dispatch(initializeCartAndWishList())}>Empty Cart</button>
                  Total: RS 2000
                <button onClick={()=>router.push('/')}>Continue Shopping</button></div>
                
    </div>
    </>
  )
}

export default index
