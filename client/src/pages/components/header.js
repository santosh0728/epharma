import Image from 'next/image';
import { Avatar, Popover, Badge } from 'antd';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../../public/Logo.png"
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import { handleLogout } from '@/redux/reducerSlice/users';
import { initializeCartAndWishList } from '@/redux/reducerSlice/products';
import React, { useState } from 'react';
import { Drawer } from 'antd';



export default function Header() {
 
  const [open, setOpen] = useState(false);
  const { cartList } = useSelector(state => state.products)
  const { wishList } = useSelector(state => state.products)
  const dispatch = useDispatch()
  const userLogout = () => {
    dispatch(handleLogout()),
    dispatch(initializeCartAndWishList())
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { isLoggedIn, userDetails } = useSelector(state => state.users)

  const content = (
    <div>

      <Link href="/profile">Profile</Link>
      <p onClick={userLogout}>Logout</p>
    </div>
  );

  // To pass unique item to CartDrawer
const uniqueCartList = [];

cartList.forEach(item => {
  const existingProductIndex = uniqueCartList.findIndex(product => product._id === item._id);

  if (existingProductIndex !== -1) {
    // If the product already exists in uniqueCartList, increment its quantity
    uniqueCartList[existingProductIndex].quantity++;
  } else {
    // If the product is not in uniqueCarutList, add it with a quantity of 1
    uniqueCartList.push({ ...item, quantity: 1 });
  }

  // To remove Item from the cart

  
});

  return (
    <>

      <header>
        
      <Drawer title="Cart" placement="right" onClose={onClose} visible={open}>
      {uniqueCartList.map((item)=>{

                    return(
                      <>
                       <div className='card1'>
               
               <Image class="w-full h-full object-cover"
                src={'http://localhost:5000/product-img/'+ item._id} 
                alt="F" width={200} height={200}
                 />  
                 
                
              <h1>{item.productName}</h1> 
               <p>{item.productDescription}</p> 
               <h2>Unit Price:Rs.{item.productPrice}</h2>
               <h3> Quantity:{item.quantity}</h3>
               <button>Remove</button>
               </div>
                      </>
                    )
                  })}
      </Drawer>
        {/* {JSON.stringify(wishList)}
                  {JSON.stringify(cartList)} */}
                  

        <div className="container-header">
          <nav>
            {isLoggedIn ? (
              <>
                <div className="logo">
                  <a href='/'> <Image
                    src={Logo}
                    width={50}
                    height={50}
                    alt="logo"
                  ></Image></a>
                </div>
                <div className="search-bar">
                  <input type="text" placeholder="Search products..." />
                  <button>Search</button>

                </div>
                <div className="avatar">


                  <Popover placement="bottom" title={userDetails.fullname} content={content} trigger="click">
                    <Avatar
                      size="large"
                      style={{
                        backgroundColor: '#fde3cf',
                        color: 'black',
                        marginTop: '0px',
                        fontSize: '1.5rem',
                        marginRight: '10px'
                      }}
                    >
                      {userDetails.fullname[0]}
                    </Avatar>
                  </Popover>
                  <div className='cartlist' style={{ marginRight: '20px' }}>
                    <Badge count={cartList.length}>
                      <ShoppingCartOutlined onClick={showDrawer}
                        style={{
                          fontSize: '30px',
                          color: "white",

                        }} />
                    </Badge>
                  </div>
                  <div className='wishlist'>
                    <Badge count={wishList.length}>
                      <HeartOutlined
                        style={{
                          fontSize: '30px',
                          color: "white"
                        }} />
                    </Badge>
                  </div>
                </div>

              </>
            ) :
              <>
                <div className="logo">
                  <a href='/'> <Image
                    src={Logo}
                    width={50}
                    height={50}
                    alt="logo"
                  ></Image></a>
                </div>
                <div className="search-bar">
                  <input type="text" placeholder="Search products..." />
                  <button>Search</button>
                </div>
                <ul className="nav-menus">
                  <li><Link href="/login">Login</Link></li>
                  <li><Link href="/signup">Signup</Link></li>
                
                <div className='cartlist' style={{ marginRight: '20px' }}>
                    <Badge count={cartList.length}>
                      <ShoppingCartOutlined onClick={showDrawer}
                        style={{
                          fontSize: '30px',
                          color: "white",

                        }} />
                    </Badge>
                  </div>
                  <div className='wishlist'>
                    <Badge count={wishList.length}>
                      <HeartOutlined
                        style={{
                          fontSize: '30px',
                          color: "white"
                        }} />
                    </Badge>
                  </div>
                  </ul>
              </>}


          </nav>
        </div>

      </header>
    </>
  )
}
