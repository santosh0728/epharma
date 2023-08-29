import React, { useState} from 'react';
import {  Drawer } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/reducerSlice/products';

export default function CartDrawer (){
  const [open, setOpen] = useState(false);
  const { cartList } = useSelector(state => state.products)
  const dispatch=useDispatch()

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  // To pass unique item to CartDrawer
  const uniqueCartList = [];

  cartList.forEach(item => {
    const existingProductIndex = uniqueCartList.findIndex(product => product._id === item._id);

    if (existingProductIndex !== -1) {
      // If the product already exists in uniqueCartList, increase its quantity
      uniqueCartList[existingProductIndex].quantity++;
    } else {
      // If the product is not in uniqueCarutList, add it with a quantity of 1
      uniqueCartList.push({ ...item, quantity: 1 });
    }
  });

  <Drawer title="Cart" placement="right" onClose={onClose} visible={open} showDrawer={showDrawer}>
  {uniqueCartList.map((item) => {
    return (
      <>
        <div className='card1'>
          <Image class="w-full h-full object-cover"
            src={'http://localhost:5000/product-img/' + item._id}
            alt="F" width={200} height={200}
          />
          <h1>{item.productName}</h1>
          <p>{item.productDescription}</p>
          <h2>Unit Price:Rs.{item.productPrice}</h2>
          <h3> Quantity:{item.quantity}</h3>
          <button onClick={()=>dispatch(removeFromCart(item))}> Remove</button>
        </div>
      </>
    )
  })}
</Drawer>
};

