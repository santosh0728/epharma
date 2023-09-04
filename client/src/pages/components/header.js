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
import { removeFromCart } from '@/redux/reducerSlice/products';
import { useRouter } from 'next/router';


export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartList } = useSelector(state => state.products)
  const { wishList } = useSelector(state => state.products)
  const dispatch = useDispatch()
  const router=useRouter();
  //to calculate the total quantity on the cart
  const totalQuantity = cartList.reduce((total, item) => total + item.quantity, 0);
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

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cartList.forEach(item => {
      const itemPrice = item.productPrice * item.quantity;
      totalPrice += itemPrice;
    });

    return totalPrice;
  };

  return (
    <>
      <header>
        <Drawer title="Cart" placement="right" width={450} onClose={onClose} visible={open}>
          <div className="cart-items">
            {cartList.map(item => (
              <div className="card1" key={item._id}>
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
                <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
              </div>
            ))}
          </div>

          <div className="totalAndButton">
            {cartList.length > 0 && (
              <>

                <p>Total: Rs.{calculateTotalPrice()}</p>
                <button onClick={()=> router.push('/cart')}>Go to Cart</button>

              </>
            )}

            {cartList.length === 0 && <div className='empty-cart'>Your Cart is empty add some item to cart</div>}
          </div>
        </Drawer>


        {/* {JSON.stringify(wishList)}
                  {JSON.stringify(cartList)} */}
        <div className="container-header">
          <nav>
            {isLoggedIn ? (
              <>
                <div className="logo">
                  <Link href='/'> <Image
                    src={Logo}
                    width={50}
                    height={50}
                    alt="logo"
                  ></Image></Link>
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
                    <Badge count={totalQuantity}>
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