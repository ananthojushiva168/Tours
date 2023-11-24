import React, { useState } from 'react'
import { useGlobalContext } from './context'
import { Rating } from 'react-simple-star-rating'

export default function ReviewEdit({data, id}) {
    
    const{EditReview} = useGlobalContext()
    const[rating, setRating] =useState()
    const[comment, setReview] = useState(data)   
     console.log(data, id);
    const handleRate = (rate)=>{
        setRating(rate)
    
      }
      function submitReview(e){
        e.preventDefault()
       EditReview(id,comment, rating)

      }
      function handleComment(e) {
        setReview(e.target.value)
      }
  return (
    <div className='editReview'>
        <form onSubmit={submitReview}>
        <div>
            <label htmlFor="">your old review</label>
            <textarea  cols="60" rows="4"
              value={comment}
              onChange={handleComment}
         ></textarea>
         </div>
         <div>
            <Rating 
            size="25px"
        onClick={handleRate} 
        ratingValue={rating}
        />
        </div>
        <button>Update Review</button>
        </form>
    </div>
  )
}
