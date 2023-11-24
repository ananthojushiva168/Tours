import React, { useState } from 'react'
import { DynamicStar } from 'react-dynamic-star'
import ReviewEdit from './reviewEdit'
import "./Readreview.css"
import { useGlobalContext } from './context'

export default function ReviewRead({_id, user, review,rating,name}) {
  const{users, refresh, setRefresh, DeleteReview} = useGlobalContext()
  console.log(review);
    const[stat, setstate] = useState(false)
    const token = JSON.parse(localStorage.getItem('token'))
  console.log(token);
  return (
    <div>
                    <div className='ReadReview'>
                    { token !== null   ?
                    token && stat && refresh ? <ReviewEdit data={review} id={_id}/> : "" : ""}
                    <h3>😦&nbsp;&nbsp;&nbsp;{name}</h3>
                    <div className='comment'>
                    <DynamicStar rating={rating} outlined="black" width="20" height="20"/>
                    <p>{review}</p>
                    {token !== null ?
                      users._id === user ? 
                      <div>
                     {token && stat && refresh ? <button className='btnclose' onClick={()=>setstate(!stat)}>XXXX</button> : ""}
                      <button onClick={()=>{setstate(true) 
                      setRefresh(true)
                      }}>edit</button>
                      <button onClick={()=>{DeleteReview(_id) 
                      setRefresh(!refresh)
                      }}>delete</button> 
                      </div>
                       : "" :""
                    }
                    
                    </div>
                    </div>
    </div>
  )
}
