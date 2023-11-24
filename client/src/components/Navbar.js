import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./Navbar.css"

export default function Navbar() {
const [email, setEmail] = useState()
const{user,setUser} = useGlobalContext()
const Navigate = useNavigate()
  useEffect(()=>{
  const data = JSON.parse(localStorage.getItem('user'))
    if (data) {
      setEmail(data.email)
    }  
     
}, [user])

  function logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setEmail("")
      setUser(false)
      Navigate("/login")
    } 
  
  return (
    <nav>
        <div>
            React Tours
        </div>
        <div>
            <Link to="/">Home</Link> 
            <Link to="/location">Location</Link>
            <Link to="/login">{email ? email : "Login"}</Link>
         {email ? <button onClick={logout}>Logout</button> :<Link to="/registration"> <button>Register</button></Link>}
        </div>
    </nav>
  )
}
