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

  const [currentData, setCurrentData] = useState({});
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [details, setDetails] = useState({});
  const [isImperial, setIsImperial] = useState('imperial')
  const [error, setError] = useState('');
  const [location, setLocation] = useState('houston')
  const [icon, setIcon] = useState('')
  const [searches, setSearches] = useState([])
  const [results, setResults] = useState(false)
  const [currentBackground, setCurrentBackground] = useState()
  const [isDay, setIsDay] = useState(false)



  const handleClose = () => {
    setError('')
    const cover = document.querySelector("#app-cover")
    const modal = document.querySelector("#error-modal")
    cover.style.display = "none"
    modal.style.display = "none"
  }

  let searchRef = useRef(searches)

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
    const getWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ q: location, units: isImperial ? "imperial" : "metric"})
        console.log(data)
        setIcon(data.current.icon)
        setCurrentData(data.current)
        setHourlyData(data.hourly)
        setDailyData(data.daily)
        setDetails(data.details)
        setCurrentBackground(data.currentBackground)
        setError('')
        setIsDay(data.isDay)
      } catch (err) {
        if (err.message === "Cannot read properties of undefined (reading 'lat')") {
          setError("No Location Found")
        } else {
          setError(err.message)
        }
      }
    }
    getWeather(location)
  }, [location, icon, isImperial])

  return (
    <>
      <div className="flex justify-center w-full h-2screen">
        { error && <div id="app-cover" className="w-full h-2screen absolute z-20 backdrop-blur-3xl"></div>}
        <main className="w-full h-inherit overflow-y-scroll">
          <GetBackground data={{cond: icon}}/>
          <div className="h-fit flex flex-col items-center bg-center bg-no-repeat pt-10 gap-5 bg-fixed z-10 w-inherit">
            {error && 
              <div id="error-modal" className="border-2 border-white/50 rounded-xl 2xl:h-5/6 2xl:w-1/2 xl:h-1/2 xl:w-2/3 absolute z-30 backdrop-blur-3xl flex flex-col items-center justify-center">
                <div className="h-2/5 w-full flex flex-col items-end px-3">
                  <p onClick={() => handleClose()} className="text-5xl hover:text-white/50 hover:cursor-pointer">&times;</p>
                </div>
                <div className="h-3/5 flex flex-row items-start justify-start">
                  <div className="flex flex-row items-center">
                    <BiSolidError size={100}/>
                    <p className="text-6xl font-extrabold pl-4" >{error.includes('429') ? "Out Of API Calls" :  error.includes("'data.data' as it is undefined") ? "No Matching Location" : error}</p>
                  </div>
                </div>
              </div>
            }
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
                <CurrentWeather background={currentBackground} data={formatToCurrent(currentData)}/>
                <HourlyWeather isDay={isDay} data={hourlyData}/>
                <DailyWeather isDay={isDay} current={formatToCurrent(currentData)} daily={dailyData}/>
                <CurrentDetails isImperial={isImperial} isDay={isDay} data={formatToDetails(details)}/>
              </div>
          </div>
        </main>
      </div>
    </>
  );
}



export default App;
