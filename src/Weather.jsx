import React from 'react'
import useFetch from './useFetch'

const Weather = () => {
    const allData =useFetch("https://api.openweathermap.org/data/2.5/weather?q=kakkanad&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric")
    console.log(allData);
    
  return (
    <div>
        
    </div>
  )
}

export default Weather