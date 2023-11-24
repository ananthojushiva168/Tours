import  axios  from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Addlocation.css"
import FormSubmit from './formSubmit'

export default function Addlocations() {
const [loading, setLoading]=useState(true)
const [model, setModel] = useState(false)
  const [addlocation, setAddlocation] = useState({
    title:"",
    address:"",
    description:"",
    price:0
  })
  const [Avatar, setAvatar] = useState([])
  
  const formData = new FormData()
  const Navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('token'))

  if(!token){
    return(
      <div>
        <h1>Please Reigister or login to addLocation</h1>
        <button onClick={()=>Navigate("/registration")}>Register</button>
        <button onClick={()=>Navigate("/login")}>Login</button>
      </div>
    )
  }

  const handleChange =(e)=>{
    const{name, value} = e.target
    setAddlocation({
      ...addlocation,[name]:value
  })
  }

  const uploadFileHandler = (e)=>{ 
    setAvatar(e.target.files)
  }

  if (!loading) {
    return(
      <div>
        <h1>Loading........</h1>
      </div>
    )
  }

  console.log(Avatar);
  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(false)
    for (let i = 0; i < Avatar.length; i++) {  
      formData.append(`image`, Avatar[i])
    }
    const{title, address, description, price} = addlocation
    formData.append('title', title )
    formData.append('address', address )
    formData.append('description', description )
    formData.append('price', price)
    try {
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: `Bearer ${token}`
        },
      }
console.log(...formData)

      const res = await axios.post('http://localhost:4000/createdata', formData, config)
      console.log(res) 
      if (res.statusText === "OK") {
        setModel(true)
      }
      setLoading(true)
    } catch (error) {
      console.log(error)
     setLoading(true)
    }

  }

  return (
       <div  className="registration-box">
       {model ? <FormSubmit /> : ""}
        <form  className={model ? "hideForm" : 'addlocForm'} onSubmit={handleSubmit}>
        <h1>New Locations</h1>
        <div className='ifield'>
        <label htmlFor="title">Title</label>
        <input type="text"
        id='title'
        name='title'
        value={addlocation.title}
        onChange={handleChange}
        required
         />
        </div>
        <div className='secondField'>
        <div className='ifield'>
        <label htmlFor="address">Location:-</label>
        <input type="text"
        id='address'
        name='address'
        value={addlocation.address}
        onChange={handleChange}
        required
         />
         </div>
         <div className='ifield'>
        <label htmlFor="price">price:-</label>
        <input type="number"
        id='price'
        name='price'
        value={addlocation.price}
        onChange={handleChange}
        required
         />
         </div>
         </div>
         <div className='ifield'>
        <label htmlFor="description">Description:-</label>
        <input type="text"
        id='description'
        name='description'
        value={addlocation.description}
        onChange={handleChange}
        required
         />
         </div>
        <input type="file" 
          name='image'
           onChange={uploadFileHandler}
           multiple
           required
        /> 
        {/* {Avatar.filepreview !== null ? <img src={Avatar.filepreview} alt="nnn" width="200px" /> : null } */}
        <button className='btn-add'>Add Location</button>
        <Link to="/location">view all locations</Link>
        </form>
    </div>
  )
}
