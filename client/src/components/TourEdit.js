import axios from 'axios'
import React, { useState } from 'react'
import { useGlobalContext } from './context'
import "./TourEdit.css"
export default function TourEdit({title,description, _id, address, images:[{image}]}) {
    const[form, setForm]=useState({
        title:title,
        description:description,
        address:address,

    })
    const{refresh, setRefresh, edit, setEdit} = useGlobalContext()
    const [Avatar, setAvatar] = useState([])
    const[loading, setLoading] = useState(false)
   
  const formData = new FormData()

  function handleChange(e) {
    const{name,value}=e.target
    setForm({
     ...form,
     [name]:value
    })
 
 }

 const uploadFileHandler = (e)=>{ 
    setAvatar(e.target.files)
  }

    

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const{title, description, address} = form
        if (Avatar.length >= 1) {
          for (let i = 0; i < Avatar.length; i++) {  
            formData.append(`image`, Avatar[i])
          }  
        }
        
        formData.append('title', title )
        formData.append('description', description )
        formData.append("address", address)
        try {
          const token = JSON.parse(localStorage.getItem('token'))
          
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${token}`
            },
          }
    
          const res = await axios.patch(`http://localhost:4000/createdata/${_id}`, formData, config)
          console.log(res) 
          setRefresh(!refresh)
          setEdit(!edit)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
    
      }

  return (
    <div>
    {loading  ?  <h1>Updating Tour .................</h1> :
    <form onSubmit={handleSubmit} className="edit-tour-form">
       <label htmlFor="title">Title</label>
        <input 
        type="text" 
        name='title' 
        id='title'
        value={form.title}
        onChange={handleChange}
        placeholder="title"    
        />
        <br />
       <label>description</label>
        <textarea  cols="60" rows="5"
               name='description'
              value={form.description}
              onChange={handleChange}
              placeholder="description"    

         ></textarea>
        <br />
       <label>address</label>
        <input 
        type="text" 
        name='address' 
        value={form.address}
        onChange={handleChange}   
        placeholder="address"
        required
        />
        <br />
        <input type="file" 
          name='image'
           onChange={uploadFileHandler}
           multiple
        />  
        <button className='edit-btn'>update Tour</button>
        </form>}
        <br />
        <br />
    </div>
  )
}
