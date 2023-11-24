import { Link } from 'react-router-dom'
import { useGlobalContext } from './context'
import { Rating } from 'react-simple-star-rating'
import { useState } from 'react'
// import ReviewEdit from './reviewEdit'
import ReviewRead from './ReviewRead'

export default function Reviews() {
  const [rating, setRating] = useState(1)
  const[comment, setComment] = useState()
  const{reviews, login, ReviewWrite, duplicateReview, token} = useGlobalContext()
  console.log(reviews)
  const handleRate = (rate)=>{
    setRating(rate)

  }
  const handleComment =(e)=>{
    setComment(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    const Id = JSON.parse(localStorage.getItem("Dataid"))
    ReviewWrite(comment, rating, Id)
    setComment("")
    setRating(0)
  };
  // useEffect(()=>{
  //   // const userId = JSON.parse(localStorage.getItem("user"))
  //   // console.log(userId.id);
  // },[refresh])
  return (
    <div>
    {!token ? <p>Please login or register to write Review</p> : ""}
    <label>write a review</label>
    <br />
    <form onSubmit={handleSubmit}>
        <textarea  cols="60" rows="10"
        disabled={!token ? true : false}
        value={comment}
        onChange={handleComment}
         ></textarea>
        {login ? <p>please <Link to="/login">login</Link> or <Link to="/registration">Register</Link> to write a Review</p> : ""}
        <Rating 
        onClick={handleRate} 
        ratingValue={rating}
        />
        {duplicateReview ? <p>Already written Review pls edit if you want to change</p> : ""}
        <button disabled={!token ? true : false}>submit</button>
        </form>
        <h2>Top Reviews</h2>
        {
         !reviews || reviews[0] ==  null  ?  <h1>not rating</h1> : 
         reviews.map((item,i)=>{
                return(
                  <ReviewRead key={i} {...item}/>                    
                ) 
            })
         }
    </div>
  )
}
