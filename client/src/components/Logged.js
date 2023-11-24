import React from 'react'
import "./logged.css"
export default function Logged({det}) {
  return (
    <div className='logged'>

     <p>your logged in as  {det}</p>
 <p>pls click on Logout button placed on right top corner of your Screen if you wish to LogOut</p>
    </div>
  )
}
