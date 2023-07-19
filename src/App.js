// Utility
import getFormattedWeatherData from './api/weather-api'
import GetBackground from './util/GetBackground'
import placesAPI from './api/places-api'

// Components
import CurrentDetails from './components/CurrentDetails'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'
import HourlyWeather from './components/HourlyWeather'

// Icons/Images
import houston from './media/houston.jpg'
import houstonNight from './media/houstonNight.jpg'
import { BiSolidError } from 'react-icons/bi'
import { FaSearch } from'react-icons/fa'

// ReactJS
import { useEffect, useState, useRef } from 'react'

// Zod 
import { useForm } from'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Other libraries


const schema = z.object({
  location: z.string().min(3, { message: "Location Input Must Have 3 Characters"})
})


function App() {

  const [currentData, setCurrentData] = useState({});
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [details, setDetails] = useState({});
  const [error, setError] = useState('');
  const [location, setLocation] = useState('hawaii')
  const [icon, setIcon] = useState('')
  const [searches, setSearches] = useState([])
  const [results, setResults] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema)})

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

  let searchRef = useRef(searches)

  const handleChange = async (query) => {
    if (query === "") {
      setResults(false)
      
    } else {
      const input = await placesAPI(query)
      setSearches(input)
      setResults(true)
      searchRef.current = input
      console.log(searchRef.current)
      console.log(input)
    }
  }

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ q: location, units: "imperial"})
        setIcon(data.current.icon)
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
  }, [location, icon])

  return (
    <>
      <div className="flex justify-center w-full h-2screen">
        <main className=" w-full h-inherit overflow-y-scroll">
          <GetBackground data={{cond: icon}}/>
          <div className="h-fit flex flex-col items-center bg-center bg-no-repeat pt-10 gap-5 bg-fixed z-10 w-inherit">
            {error && 
              <div className="rounded-xl h-5/6 w-1/2 absolute z-20 backdrop-blur-3xl flex items-center justify-center">
                <BiSolidError size={100}/>
                <p className="text-6xl font-extrabold pl-4" >{error.includes('429') ? "Out Of API Calls" : error}</p>
              </div>
            }
            <form
              onChange={(event) => handleChange(event.target.value)}
              onSubmit={handleSubmit(data => {
                onSubmit(data)
                reset()
                setResults(false)
            })} className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2  2xl:w-1/3 backdrop-blur-xl rounded-xl">
              <div className="border-2 border-white/50 bg-zinc-400/30 min-h-60px relative flex flex-col items-center justify-center rounded-xl px-3 py-2 sm:px-6 md:px-8">
                  <div className="border-2 border-white/50 flex flex-col items-center justify-center w-full h-full rounded-xl">
                    <div className="w-full flex items-center pl-5 py-1">
                      <FaSearch size={20}/>
                      <input id="search" {...register('location')} type="text" autoCorrect="false" autoComplete="false" autoFocus={true} placeholder='City, State, Country' className=" rounded-xl ml-2 h-10  bg-transparent focus:border-none, outline-none placeholder:text-white placeholder:text-xs placeholder:xs:text-sm placeholder:sm:text-base"/>
                    </div>
                    {results && 
                    <div className="w-full">
                      <ul className="flex flex-col justify-start w-full">
                        {searches.map((search, index) => (
                          <li key={index} className="py-2 border-y-2 pl-5 border-white/30 hover:bg-zinc-400/40">{search.description}</li>
                        ))}
                      </ul>
                    </div>
                    }
                  </div>
              </div>

              {errors.location && <div className="flex items-center justify-center w-full"><p className="backdrop-blur-xl">{errors.location.message}</p></div>}

            </form>
              <div className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2  2xl:w-1/3 flex flex-col gap-10">
                <CurrentWeather background={houston} data={formatToCurrent(currentData)}/>
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
