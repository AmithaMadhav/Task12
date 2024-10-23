import { useState } from 'react'
import './App.css'
import sunLogo from './assets/sun.png'
import cloudLogo from './assets/cloud3.png'

function App() {
  // State to hold weather data and location input
  const [location, setLocation] = useState('')
  const [temp, setTemp] = useState(0)
  const [set, setSet] = useState(0)
  const [rise, setRise] = useState(0)
  const [pressure, setPressure] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [max, setMax] = useState(0)
  const [min, setMin] = useState(0)
  const [image, setImage] = useState(sunLogo)

  const [error, setError] = useState(null)

  // Function to fetch weather data
  const showData = async () => {
    try {
      const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e'
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)

      if (!response.ok) {
        throw new Error('Location not found')
      }

      const data = await response.json()

      // Extracting required details from the API response
      setTemp(data.main.temp)
      setPressure(data.main.pressure)
      setHumidity(data.main.humidity)
      setMax(data.main.temp_max)
      setMin(data.main.temp_min)
      setRise(new Date(data.sys.sunrise * 1000).toLocaleTimeString())
      setSet(new Date(data.sys.sunset * 1000).toLocaleTimeString())
      setError(null)
      if(data.main.temp>18){
        setImage(sunLogo)
      }else{
        setImage(cloudLogo)
      }
    } catch (err) {
      setError(err.message)
    }
    
  }

  return (
    <>
      <div className='' style={{ minHeight: '100vh', textAlign: 'center' }}>
        <h1 className='p-3'>Weather App</h1>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg"></div>
            <div className="col-lg-5">
              <img src={image} alt="image" />
              <h3>{location}</h3>
              <h1>{temp}°C</h1>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <h5>Feels Like : {temp}°C</h5>
            </div>
            <div className="col-lg-5">
              <div className='d-flex mb-5'>
                <input 
                  type="text" 
                  placeholder='Enter your location here !!!' 
                  className='form-control me-2 w-75'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button onClick={showData} className='btn btn-info'>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <i className="fa-solid fa-wind fa-2xl pt-4" style={{ color: '#ffffff' }}></i>
                  <p>Pressure</p>
                  <h5>{pressure} hPa</h5>
                </div>
                <div className="col-lg-3">
                  <i className="fa-solid fa-droplet fa-2xl pt-4" style={{ color: '#ffffff' }}></i>
                  <p>Humidity</p>
                  <h5>{humidity}%</h5>
                </div>
                <div className="col-lg-3">
                  <i className="fa-solid fa-temperature-arrow-down fa-2xl pt-4" style={{ color: '#ffffff' }}></i>
                  <p>Min-Temp</p>
                  <h5>{min}°C</h5>
                </div>
                <div className="col-lg-3">
                  <i className="fa-solid fa-temperature-arrow-up fa-2xl pt-4" style={{ color: '#ffffff' }}></i>
                  <p>Max-Temp</p>
                  <h5>{max}°C</h5>
                </div>
                <div className="col-lg-3">
                  <i className="fa-solid fa-sun fa-2xl pt-4" style={{ color: '#ffffff' }}></i>
                  <p>SunRise</p>
                  <h5>{rise}</h5>
                </div>
                <div className="col-lg-3">
                  <i className="fa-solid fa-moon fa-2xl pt-4" style={{ color: '#ffffff' }}></i>
                  <p>SunSet</p>
                  <h5>{set}</h5>
                </div>
              </div>
            </div>
            <div className="col-lg"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
