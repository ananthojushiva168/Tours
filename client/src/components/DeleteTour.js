import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context'

export default function DeleteTour({_id}) {
  const{setDelete,DeleteTourData,Deletingtour,setDeleting} = useGlobalContext()
  const Navigate = useNavigate()
  if (Deletingtour) {
    return(
      <div>
        <h1>Tour Deleted Successfully</h1>
        <button onClick={()=> {setDeleting(false)
          setDelete(false)
          Navigate("/location")}}>back to locations</button>
      </div>
    )
  }
  return (
    <div className='Delete-Tour'>
      <div>
       <h1>Are your Sure you want to delete the Tour ?</h1>
       <button onClick={()=>DeleteTourData(_id)}>yes</button>
       {/* {Deletingtour ? Navigate("/location") : ""} */}
       <button onClick={()=>setDelete(false)}>No</button>
       </div>
    </div>
  )
}
