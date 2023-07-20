// Utility
import getFormattedWeatherData from './api/weather-api'
import GetBackground from './util/GetBackground'
import placesAPI from './api/places-api'
import referenceAPI from './api/reference-api'
import cityAPI from './api/city-api'

// Components
import CurrentDetails from './components/CurrentDetails'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'
import HourlyWeather from './components/HourlyWeather'
import SearchForm from './components/SearchForm'

// Icons/Images
import { BiSolidError } from 'react-icons/bi'


// ReactJS
import { useEffect, useState, useRef } from 'react'


function App() {

  const [currentData, setCurrentData] = useState({});
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [details, setDetails] = useState({});
  const [error, setError] = useState('');
  const [location, setLocation] = useState('houston')
  const [icon, setIcon] = useState('')
  const [searches, setSearches] = useState([])
  const [results, setResults] = useState(false)
  const [currentBackground, setCurrentBackground] = useState()


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
  let backgroundRef = useRef(currentBackground)

  const handleSubmit = async (data) => {
    setLocation(data)
  }

  const handleChange = async (query) => {
    if (query === "") {
      setResults(false)
      
    } else {
      const input = await placesAPI(query)
      const reference = await referenceAPI()
      setSearches(input)
      setResults(true)
      searchRef.current = input
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
        setCurrentBackground(data.currentBackground)
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
                <p className="text-6xl font-extrabold pl-4" >{error.includes('429') ? "Out Of API Calls" :  error.includes("'data.data' as it is undefined") ? "No Matching Location" : error}</p>
              </div>
            }
            <SearchForm onSubmit={(location) => {
                handleSubmit(location)
                setResults(false)
              }} 
              onChange={(data) => handleChange(data)} 
              searches={searches}
              results={results}
            />
              <div className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2  2xl:w-1/3 flex flex-col gap-10">
                <CurrentWeather background={currentBackground} data={formatToCurrent(currentData)}/>
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
