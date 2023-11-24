import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context'
import LocationMap from './LocationMap'
import Reviews from './Reviews'
import { DynamicStar } from 'react-dynamic-star'
import { IoLocationSharp } from "react-icons/io5";
import "./Tour.css"
import TourEdit from './TourEdit'
import Slider from './Slider'
import DeleteTour from './DeleteTour'

export default function Tour() {
  const{loading, setLoading, setReview,refresh,users, Deletetour, setDelete, edit, setEdit} = useGlobalContext()
  const[data, setData] = useState() 
  const[average, setAverage] = useState()
  console.log(refresh)
    useEffect(()=>{
      async function fetchData() {
        try {
        const Id = JSON.parse(localStorage.getItem("Dataid"))
        const url = `http://localhost:4000/createdata/${Id}`
        const response = await fetch(url)
        const res = await response.json()
        console.log(res);
        setData([res.data])
        setReview(res.tourReview)
        setAverage(res.avg)
        setLoading(false)
        } catch (error) {
          console.log(error);
        }
        
        }
        fetchData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refresh])

  
   

  return (
    <div>
    {loading ? <h1>loading ...........</h1> : 
    data.map((item, i)=>{
      const{_id, title,postedBy,description,uploadedby, price, images:[{image}], location:{coordinates:[a,b],formattedAddress} } =item
      return(
        <div key={_id}>
        <div className="review-image-box">
        <div>
        <div className='review-img'>
        <Slider imgData={image}/>
        </div>
        <br />
        <br />
        <div className='image-desc-box'>
        <h3>More about {title}</h3>
        <p><IoLocationSharp/>{formattedAddress}</p>
        <p>{description}</p>
        <p>postedBy:-{postedBy}</p>
        <p>Rs:-{price}/-</p>
    
        {
         users ?  
         users._id === uploadedby ?
        <div className='edit-delete-btn'>
          <button onClick={()=> setEdit(!edit)} className="edit-btn">Edit</button>
          { edit ?
          <TourEdit key={i} {...item}/> : ""
          }
          <button onClick={()=> setDelete(true)} className="edit-btn">Delete</button>
            {Deletetour ? <DeleteTour key={i} {...item}/> : ""}
        </div> : "" : ""
        }
        </div>
        </div>
        <div className='review-map'>
        <LocationMap lon={a} lat={b} />
        <div className='rating-box'>
        <h4>Location rating score</h4>
        <DynamicStar rating={average}  outlined="black" width="50" height="50"/>
        <p>{average} out of 5</p>
        <h3>Top Reviews</h3>
        <Reviews/>
        </div>
        </div>
        </div>
        </div>
      ) 
    })
    }
    
    </div>
  )
}


