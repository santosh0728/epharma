import Image from 'next/image';
import { Avatar, Popover, Badge } from 'antd';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../../public/Logo.png"
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import { handleLogout } from '@/redux/reducerSlice/users';
import { initializeCartAndWishList } from '@/redux/reducerSlice/products';
import React, { useState,useEffect } from 'react';
import { Drawer } from 'antd';


export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartList } = useSelector(state => state.products)
  const { wishList } = useSelector(state => state.products)
  const [products,setProducts]= useState([])
  const fetchProducts= async()=> {
   const res= await fetch('http://localhost:5000/products')
    const {data} =await res.json()
    setProducts(data)
  }


  useEffect(() => {
    fetchProducts()
  },[])
 
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
  return (
    <>

      <header>
      <Drawer title="Cart" placement="right" onClose={onClose} visible={open}>
      
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
                      <ShoppingCartOutlined
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
