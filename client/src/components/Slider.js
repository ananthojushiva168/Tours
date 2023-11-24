import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import "./Slider.css"
function Slider({imgData}) {
  const[index, setIndex] = useState(0)


  useEffect(()=>{
  const lastIndex = imgData.length - 1
  console.log(lastIndex)
  if (index < 0) {
    setIndex(lastIndex)    
  }
  if (index > lastIndex) {
    setIndex(0)   
 }
  },[index, imgData])

  return <section className="section">
    
    <div className="section-center">
      {imgData.map((item, itemIndex)=> {
  let position ="nextSlide"
  if(itemIndex === index){
    position = "activeSlide"
  }
  if(itemIndex === index - 1 || (index === 0 && itemIndex === imgData.length - 1)){
    position = "lastSlide"
  }
       return <article className={position} key={itemIndex}>
        <img src={item} alt="hdgv" className="cardi-img" />
        
       </article>
      })}
      <button className="prev" onClick={()=> setIndex(index - 1)}>
        <FiChevronLeft/>
      </button>
      <button className="next" onClick={()=> setIndex(index + 1)}>
        <FiChevronRight/>
      </button>
    </div>
  </section>
}

export default Slider;
