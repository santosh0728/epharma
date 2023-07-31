import { setUserDetails } from '@/redux/reducerSlice/users';
import { Avatar } from 'antd';
import Link from "next/link";
import { useSelector } from 'react-redux';

export default function Header() {
  const {isLoggedIn}=useSelector(state=>state.users)
  return (

    <header>
      {}
      <div className="container">
        <nav>
          {/* <div className="logo">
           <a href='/'><Image src={Logo} alt="Picture of the author"/></a>
        </div> */}
        {isLoggedIn ?(
           <Avatar
           size="large"
           style={{
             backgroundColor: '#fde3cf',
             color: '#f56a00',
             marginTop: '15px',
             fontSize: '1.5rem',
             marginRight: '10px'
           }}
         >
           U
         </Avatar>
        ):
        <ul className="nav-menus">
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/signup">Signup</Link></li>
      </ul>}
          
         
        </nav>
      </div>

    </header>

  )
}
