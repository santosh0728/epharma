import Image from 'next/image';
import { Avatar, Popover } from 'antd';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Logo from "../../../public/Logo.png"


export default function Header() {
  const router = useRouter()
  const handleLogout = () => {
    router.push('/profile')
  }
  const { isLoggedIn, userDetails } = useSelector(state => state.users)

  const content = (
    <div>

      <Link href="/profile">Profile</Link>
      <p onClick={handleLogout}>Logout</p>
    </div>
  );
  return (
    <>

      <header>
        <div className="container">
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
                      color: '#f56a00',
                      marginTop: '0px',
                      fontSize: '1.5rem',
                      marginRight: '10px'
                    }}
                  >
                    {userDetails.fullname[0]}
                  </Avatar>
                </Popover>
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
              </ul>
              </>}


          </nav>
        </div>

      </header>
    </>
  )
}
