import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./formSubmit.css"
export default function FormSubmit() {
  const Navigate = useNavigate()
  return (
    <div>
    <div className='submit-model'>
        <div className='submit-box'>
        <h1>New Location added successfully</h1>
        <button onClick={()=> Navigate("/location")} className="location-submited-btn">back to locations</button>
        </div>
        </div>
    </div>
  )
}
