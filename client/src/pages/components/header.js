
import { Avatar,Popover } from 'antd';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Header() {
  const router =useRouter()
  const handleLogout =()=>{
    router.push('/profile')
  }
  const {isLoggedIn, userDetails} = useSelector(state=>state.users)
  console.log(isLoggedIn)
  const content = (
    <div>
  
      <Link href="/profile">Profile</Link>
      <p onClick={handleLogout}>Logout</p>
    </div>
  );
  return (
   

    <header>
      <div className="container">
        <nav>
          {/* <div className="logo">
           <a href='/'><Image src={Logo} alt="Picture of the author"/></a>
        </div> */}
        {isLoggedIn ?(
          <div>
          
           <Popover placement="bottom" title={userDetails.fullname} content={content} trigger="click">
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
           {userDetails.fullname[0]}
         </Avatar>
    </Popover>
         </div>
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
