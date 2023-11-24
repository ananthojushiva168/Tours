import React, { useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, {Marker, NavigationControl}  from 'react-map-gl'
import { Link } from 'react-router-dom'
import Locationcards from './locationcards'
import "./location.css"
import PinImg from "../images/map-marker-2-64.png" 

export default function Location() {
const[data, setData] = useState([])
const fetchData = async ()=>{
    const response = await fetch("http://localhost:4000/createdata")
    const data = await response.json()
   setData(data.data)

}
useEffect(()=>{
    fetchData()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  return (
    <div className='location'>
        
        <Map 

          mapboxAccessToken='pk.eyJ1Ijoic2hpdmExNjgiLCJhIjoiY2xjMWZyZWlhMGNwZDN2b2R4dzVyOGFlYSJ9.snSXqrmACLeeadbFeZlkcw'
          style={{
            height:"277px",            
          }}

          initialViewState={{
            longitude: 78.4747,
            latitude: 17.3616,
            zoom:10
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        
>
{data.map((item, i)=>{
    const{ location:{coordinates:[a,b]}} = item
    return(
        <Marker key={i}
            longitude={a}
            latitude={b}
          ><img src={PinImg} alt='kkkk' width="40px" /> <span className='fixNum'>{i+1}</span></Marker>
    )
})}
          
          <NavigationControl/>
        </Map>
      <div className='map-btn'>
      <Link to="/addlocation" className="addlocationbtn">Add Locations</Link> 
</div>
      <Locationcards/> 
    </div>
  )
}
