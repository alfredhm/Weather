import getFormattedWeatherData from './api/weather-api'

import HourlyWeather from './components/HourlyWeather'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'

import astros from "./media/astros.jpg"
import clouds from './media/clouds.jpg'
import CurrentDetails from './components/CurrentDetails'

import { useEffect, useState } from 'react'


function App() {
   
  const [currentData, setCurrentData] = useState({});
  const [hourlyData, setHourlyData] = useState([]);
  const [details, setDetails] = useState({})

  const formatToCurrent = (data) => {
    return {
      low: data.temp_min, 
      curr: data.temp, 
      high: data.temp_max, 
      location: data.name + ", " + data.country
    }
  }

  const formatToDetails = (current) => {
    return {
      feelsLike: current.feels_like,
      uv: current.uvi,
      windSpeed: current.wind_speed,
      windDeg: current.wind_deg,
      humidity: current.humidity,
      visibility: current.visibility
    }
  }

  useEffect(() => {
    const getWeather = async () => {
      const data = await getFormattedWeatherData({ q: "houston", units: "imperial"})
      const currentData = data.current
      const hourlyData = data.hourly
      const details = data.details
      setCurrentData(currentData)
      setHourlyData(hourlyData)
      setDetails(details)
    }
    getWeather()
  }, [])
  
  console.log(hourlyData)
  console.log(currentData)

  return (
    <div className="flex justify-center w-full h-full">
      <main className="fixed w-full h-full rounded-xl overflow-y-scroll">
        <div style={{ backgroundImage: `url(${clouds})` }} className="h-2screen flex flex-col items-center rounded-xl bg-bottom bg-cover bg-no-repeat pt-28 gap-5 bg-fixed z-10 w-inherit">
          <div className=" w-4/5 md:w-3/4 xl:w-1/2 flex flex-col gap-10">
            <CurrentWeather data={formatToCurrent(currentData)}/>
            <HourlyWeather data={hourlyData}/>
            <DailyWeather />
            <CurrentDetails data={formatToDetails(details)}/>
          </div>
        </div>
      </main>
    </div>
  );
}



export default App;
