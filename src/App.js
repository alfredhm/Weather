import getFormattedWeatherData from './api/weather-api'

import HourlyWeather from './components/HourlyWeather'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'

import astros from "./media/astros.jpg"
import clouds from './media/clouds.jpg'
import CurrentDetails from './components/CurrentDetails'

import { useEffect, useState } from 'react'


function App() {
   
  const [data, setData] = useState({});

  const formatToCurrent = (data) => {
    return {
      low: data.temp_min, 
      curr: data.temp, 
      high: data.temp_max, 
      location: data.name + ", " + data.country
    }
  }

  const formatToDetails = (data) => {
    return {
      feelsLike: data.feels_like,
      uv: 0,
      windSpeed: data.speed,
      windDeg: data.deg,
      humidity: data.humidity,
      visibility: 15
    }
  }

  useEffect(() => {
    const getWeather = async () => {
      const data = await getFormattedWeatherData({ q: "houston", units: "imperial"})
      console.log(new Date(data.sunrise * 1000).toLocaleDateString("en-US"), new Date(data.sunrise * 1000).toLocaleTimeString("en-US"))
      setData(data)
      console.log(data)
    }
    getWeather()
  }, [])
  

  return (
    <div className="flex justify-center w-full h-full">
      <main className="fixed w-full h-full rounded-xl overflow-y-scroll">
        <div style={{ backgroundImage: `url(${clouds})` }} className="h-2screen flex flex-col items-center rounded-xl bg-bottom bg-cover bg-no-repeat pt-28 gap-5 bg-fixed z-10 w-inherit">
          <div className=" w-4/5 md:w-3/4 xl:w-1/2 flex flex-col gap-10">
            <CurrentWeather data={formatToCurrent(data)}/>
            <HourlyWeather />
            <DailyWeather />
            <CurrentDetails data={formatToDetails(data)}/>
          </div>
        </div>
      </main>
    </div>
  );
}



export default App;
