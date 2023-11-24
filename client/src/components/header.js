import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

export default function Header() {
  return (
    <>
    <header>
    </header> 
<div className='para-box'>
  <h1>Welcome To react Tours</h1>
  <div className='para-sub-box'>
    jump right in explore many locations feel 
    free to share some of your own and comment 
    on others
    <Link to="/location">
    <button className='nav-btn'>view Locations</button>
    </Link>
  </div>
</div>
</>
  )    
}
