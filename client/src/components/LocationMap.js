import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, {Marker, NavigationControl}  from 'react-map-gl'

export default function LocationMap({lon, lat}) {

  return (
    <div>

<Map 

mapboxAccessToken='pk.eyJ1Ijoic2hpdmExNjgiLCJhIjoiY2xjMWZyZWlhMGNwZDN2b2R4dzVyOGFlYSJ9.snSXqrmACLeeadbFeZlkcw'
style={{
  height:"400px",
  width:"607px"            
}}

initialViewState={{
  longitude: lon,
  latitude: lat,
  zoom:12
}}
mapStyle="mapbox://styles/mapbox/streets-v9"

>

        <Marker
            longitude={lon}
            latitude={lat}
          />

<NavigationControl/>
</Map>
    </div>
  )
}
