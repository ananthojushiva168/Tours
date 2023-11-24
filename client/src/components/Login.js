import React, { useState } from 'react'
import "./Login.css"
import Tent from "../images/tent.jpg"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context'
import Logged from './Logged'

export default function Login() {
  const [values, setValues] = useState({email:"", password:""})
  const { setUser } = useGlobalContext()
  const [loginErr, SetLoginErr] = useState()
  const navigate = useNavigate()

  const data = JSON.parse(localStorage.getItem('user'))

  if(data){
    const gmail = data.email
    return <Logged  det={gmail} />
  }

  function handleChange(e){
  const{name, value} = e.target
  setValues({
    ...values,[name]:value
  })
  }
  
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      SetLoginErr("")
      const{email,password} = values
      const response = await axios.post('http://localhost:4000/login', {
        email: email,
        password: password
      });
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(true)
      navigate("/");
    } catch (error) {
        console.log(error)
        SetLoginErr(error.response.data.message)
    }
  }

  return (
    <div className='Login-Box'>
      <div className='container-1'>
        <h1>React Tours</h1>
        <h1>Welcome Back</h1>
        <p>please enter your details</p>
        <form className='input-box' onSubmit={handleSubmit}>
          <label htmlFor="">username</label>
          <input type="text" name='email'
          placeholder='username@gmail.com'
            value={values.email}
            onChange={handleChange}
            required
            title='pls provide valid Email'
          />
          <label htmlFor="">password</label>
          <input type="text" name='password'
          placeholder='*******'
            value={values.password}
            onChange={handleChange}
            required
            title='pls provide valid password'
          />
          <button className='form-btn'>Sign in</button>
          {loginErr ? <p>{loginErr}</p> : ""}
        </form>
      </div>
      <div className='container-2'>
        <img src={Tent} alt="tent" width="100%" className='login-img' />
      </div>
    </div>
  )
}
