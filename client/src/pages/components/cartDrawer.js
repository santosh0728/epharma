import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

export default function CartDrawer (){
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  <Drawer title="Cart" placement="right" onClose={onClose} visible={open}>
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

