// Utility
import getFormattedWeatherData from './api/weather-api'

// Components
import CurrentDetails from './components/CurrentDetails'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'
import HourlyWeather from './components/HourlyWeather'

// Icons/Images
import clouds from './media/clouds.jpg'
import { BiSolidError } from 'react-icons/bi'
import { FaSearch } from'react-icons/fa'

// ReactJS
import { useEffect, useState } from 'react'

// Zod 
import { FieldValues, useForm } from'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const schema = z.object({
  location: z.string().min(3, { message: "Location Input Must Have 3 Characters"})
})


function App() {
   
  const [currentData, setCurrentData] = useState({});
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [details, setDetails] = useState({});
  const [error, setError] = useState('');
  const [location, setLocation] = useState('houston')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema)})

  const clearSearch = () => {
    const search = document.querySelector()
  }

  const onSubmit = (data) => {
    setLocation(data.location)
    
  }

  const formatToCurrent = (data) => {
    return {
      low: data.temp_min, 
      curr: data.temp, 
      high: data.temp_max, 
      location: data.name,
      icon: data.icon,
      // day: new Date(data.dt).toLocaleString(window.navigator.language, {weekday: 'short'})
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
      try {
        const data = await getFormattedWeatherData({ q: location, units: "imperial"})
        setCurrentData(data.current)
        setHourlyData(data.hourly)
        setDailyData(data.daily)
        setDetails(data.details)
        setError('')
      } catch (err) {
        if (err.message === "Cannot read properties of undefined (reading 'lat')") {
          setError("No Location Found")
        } else {
          setError(err.message)
        }
      }
    }
    getWeather(location)
  }, [location])

  return (
    <>
      <div className="flex justify-center w-full h-full">
        <main className="fixed w-full h-full overflow-y-scroll">
          <div style={{ backgroundImage: `url(${clouds})` }} className="h-2screen flex flex-col items-center bg-bottom bg-cover bg-no-repeat pt-28 gap-5 bg-fixed z-10 w-inherit">
            <form onSubmit={handleSubmit(data => {
              onSubmit(data)
              reset()
            })} className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2  2xl:w-1/3 backdrop-blur-xl rounded-xl">
              <div className="border-2 border-white/50 bg-zinc-400/30 min-h-60px relative flex flex-col items-center justify-center rounded-xl px-8">
                <div className="flex flex-row items-center justify-center w-full h-full">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <FaSearch size={20}/>
                  </div>
                  <input id="search" {...register('location')} type="text" autoCorrect='false' autoComplete='false' autoFocus='true' placeholder='City, State, Country' className=" border-2 border-white/50 px-4 rounded-xl ml-2 h-10 w-full bg-transparent focus:border-none, outline-none placeholder:text-white placeholder:text-sm placeholder:sm:text-base"/>
                  <div className="h-full aspect-square"></div>
                </div>
              </div>
              {error && <div className="text-center"><p>{error}</p></div>}

            </form>
              <div className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2  2xl:w-1/3 flex flex-col gap-10">
                <CurrentWeather data={formatToCurrent(currentData)}/>
                <HourlyWeather data={hourlyData}/>
                <DailyWeather current={formatToCurrent(currentData)} daily={dailyData}/>
                <CurrentDetails data={formatToDetails(details)}/>
              </div>
          </div>
        </main>
      </div>
      
    </>
  );
}



export default App;
