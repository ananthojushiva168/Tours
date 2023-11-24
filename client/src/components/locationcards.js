import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context'
import "./locationcard.css"
import{Link} from "react-router-dom"
export default function Locationcards() {
  const [Data, setData] = useState([])

  const {ViewMore, setLoading} = useGlobalContext()
  const fetchData = async ()=>{
    const response = await fetch("http://localhost:4000/createdata")
    const data = await response.json()
    console.log(data);
   setData(data.data)
}
useEffect(()=>{
    fetchData()
    setLoading(true)
    localStorage.removeItem("Dataid")
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <div className='cardimg-box'>

    {
        Data.map((item)=>{
          const{_id, images:[{image:[a]}], title, description} = item
          return(
            <div className='card-box' key={_id}>
        <div className='image-box'>
        <img src={a} alt="imh" width="100%" className='card-img' />
        </div>
        <div className='content-box'>
            <h4>{title}</h4>
            <p>{description}</p>
      <button onClick={()=> ViewMore(_id)} className="btn-card"><Link to="/tour" className='card-btn-link'>view more</Link></button>
        </div>
    </div>
          )
        })
    }
    
    </div>
  )
}
