// Utility
import getFormattedWeatherData from './api/weather-api'
import GetBackground from './components/GetBackground'
import placesAPI from './api/places-api'
import { formatToCurrent, formatToDetails }  from './util/formats'

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

  const [forecast, setForecast] = useState({
    currentData: {},
    hourlyData: [],
    dailyData: [],
    details: {},
    icon: '',
    currentBackground: null,
    isDay: false
  })

  const [searches, setSearches] = useState([])
  const [results, setResults] = useState(false)
  const [location, setLocation] = useState('houston')
  const [isImperial, setIsImperial] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('');

  let searchRef = useRef(searches)
  
  const handleClose = () => {
    setError('')
    const cover = document.querySelector("#app-cover")
    const modal = document.querySelector("#error-modal")
    cover.style.display = "none"
    modal.style.display = "none"
  }

  const handleSubmit = async (data) => {
    setLocation(data)
  }

  const handleChange = async (query) => {
    const input = await placesAPI(query)
    if (query === "") {
      setResults(false)
      
    } else if (input === "") {
      setResults(false)
      setError("No Search Results")
    } else {
      setSearches(input)
      setResults(true)
      searchRef.current = input
    }
  }

  const handleUnitClick = () => {
    setIsImperial(!isImperial)
  }

  useEffect(() => {
    setLoading(true)
    const getWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ q: location, units: isImperial ? "imperial" : "metric"})
        
        setForecast({
          currentData: data.current,
          hourlyData: data.hourly,
          dailyData: data.daily,
          details: data.details,
          icon: data.current.icon,
          currentBackground: data.currentBackground,
          isDay: data.isDay,
        })
        
        setError('')
        setLoading(false)
      } catch (err) {
        if (err.message === "Cannot read properties of undefined (reading 'lat')") {
          setError("No Location Found")
        } else {
          setError(err.message)
        }
        setLoading(false)
      }
    }
    getWeather(location)
  }, [location, isImperial, error])

  return (
    <>
      <div className="flex justify-center w-full h-2screen">
        { error && <div id="app-cover" className="w-full h-2screen absolute z-20 bg-gradient-to-br from-blue-500/50 to-blue-300/50"></div>}
        <main className="w-full h-inherit overflow-y-scroll">
          <GetBackground data={{cond: forecast.icon, error: error}}/>
          <div className="h-fit flex flex-col items-center bg-center bg-no-repeat pt-10 gap-5 bg-fixed z-10 w-inherit">
            {error && 
              <div id="error-modal" className="border-2 border-white/50 rounded-xl h-52 w-96 absolute z-30 backdrop-blur-3xl flex flex-col items-center justify-center">
                <div className="h-1/3 w-full flex flex-col items-end px-3">
                  <p onClick={() => handleClose()} className="text-3xl hover:text-white/50 hover:cursor-pointer">&times;</p>
                </div>
                <div className="h-2/3 flex flex-row items-start justify-start">
                  <div className="flex flex-row items-center">
                    <BiSolidError size={70}/>
                    <p className="text-2xl font-extrabold pl-4" >{error.includes('429') ? "Out Of API Calls" :  error.includes("'data.data' as it is undefined") ? "Error Fetching Data" : error.includes('Network') ? "No Internet" : error}</p>
                  </div>
                </div>
              </div>
            }
            {isLoading && <p className="z-10 font-extrabold text-2xl">Loading...</p>}
            <SearchForm onSubmit={async (location) => {
                await handleSubmit(location)
                setResults(false)
              }} 
              onChange={async (data) => await handleChange(data)} 
              handleUnitClick={handleUnitClick}
              searches={searches}
              results={results}
              isImperial={isImperial}
            />
              <div className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-1/3 3xl:w-1/3 flex flex-col gap-10">
                <CurrentWeather background={forecast.currentBackground} data={formatToCurrent(forecast.currentData)}/>
                <HourlyWeather isDay={forecast.isDay} data={forecast.hourlyData}/>
                <DailyWeather isDay={forecast.isDay} current={formatToCurrent(forecast.currentData)} daily={forecast.dailyData}/>
                <CurrentDetails isImperial={isImperial} isDay={forecast.isDay} data={formatToDetails(forecast.details)}/>
              </div>
          </div>
        </main>
      </div>
    </>
  );
}



export default App;
