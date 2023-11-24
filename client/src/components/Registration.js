import React, { useState } from 'react'
import "./Login.css"
import Tent from "../images/tent.jpg"
import { useGlobalContext } from './context'
import { useNavigate } from 'react-router-dom'

const intialState ={
    name:"",
    email:"",
    password:"",
}

export default function Registration() {
const {Registration, errors, user, token} = useGlobalContext()
const [values, setValues] = useState(intialState)
    
const navigate = useNavigate()
   
    if (user) {
    navigate("/")   
    }

if(token){
    return(
        <div>
            <h1>You Already have logged in to your account you don't need Registration</h1>
        </div>
    )
}    

const handleChange = (e)=>{
    const{name,value} = e.target
setValues({
    ...values,[name]:value
})
}

const onSubmit = (e)=>{
    e.preventDefault()
    const {name, email, password} = values
    Registration(name, email, password)
    
    }
    return (
        <div className='Login-Box'>
            <div className='container-1'>
                <h1>React Tours</h1>
                <h1>Welcome</h1>
                <p>please enter your details</p>
                <form className='input-box' onSubmit={onSubmit}>
                    <label htmlFor="name">name</label>
                    <input type="text"
                     name='name'
                    value={values.name}
                    onChange={handleChange}
                    required
                     />
                    <label htmlFor="email">email</label>
                    <input type="text" name='email' 
                    value={values.email}
                    onChange={handleChange}
                    required
                    />
                    <label htmlFor="password">password</label>
                    <input type="text" name='password'
                    value={values.password}
                    onChange={handleChange}
                    required
                     />
                    <button className='form-btn'>Sign in</button>
                    <br />
                    {errors ? <p>{errors}</p> : ""}
                </form>
            </div>
            <div className='container-2'>
                <img src={Tent} alt="tent" width="100%" className='login-img' />
            </div>
        </div>
    )
}
