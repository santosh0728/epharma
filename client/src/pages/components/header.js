import { Avatar } from 'antd';
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          {/* <div className="logo">
           <a href='/'><Image src={Logo} alt="Picture of the author"/></a>
        </div> */}
          <ul className="nav-menus">
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/signup">Signup</Link></li>
          </ul>
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
        </nav>
      </div>

    </header>

  )
}
