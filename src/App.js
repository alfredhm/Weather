// Utility
import getFormattedWeatherData from "./services/weatherAPI";
import GetBackground from "./components/GetBackground";
import { formatToCurrent, formatToDetails } from "./util/formats";

// Components
import CurrentDetails from "./components/CurrentDetails";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";
import SearchForm from "./components/SearchForm";
import Error from "./components/Error";

// ReactJS
import { useEffect, useState } from "react";
import getSearchData from "./services/searchData";


function App() {

  const [forecast, setForecast] = useState({
    currentData: {},
    hourlyData: [],
    dailyData: [],
    details: {},
    icon: "",
    currentBackground: null,
    isDay: false,
  });

  const [location, setLocation] = useState();
  const [coords, setCoords] = useState({lat: 29.76, lng: -95.36})
  const [isImperial, setIsImperial] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (data) => {
    setLocation(data.location)
    setCoords(data.coords)
  };

  const handleUnitClick = () => {
    setIsImperial(!isImperial);
  };

  const handleLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( async (position) => {
        setCoords({lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)})
      })
    }
  }

  const handleErrorClose = () => {
    const cover = document.querySelector("#app-cover")
    const modal = document.querySelector("#error-modal")
    cover.style.display = "none"
    modal.style.display = "none"
  }
   
  useEffect(() => {
    setLoading(true);
    const getWeather = async () => {
      localStorage.setItem("background", null)
      const searchData = await getSearchData(null, false, coords)
      setLocation(searchData.location)
      console.log(location)
      try {
        const data = await getFormattedWeatherData({
          lat: coords.lat,
          lon: coords.lng,
          units: isImperial ? "imperial" : "metric",
        });

        setForecast({
          currentData: data.current,
          hourlyData: data.hourly,
          dailyData: data.daily,
          details: data.details,
          icon: data.current.icon,
          currentBackground: localStorage.getItem("background"),
          isDay: data.isDay,
        });

        setError("");
        setLoading(false);
      } catch (err) {
        console.error(err)
        setError(err);
      }
    };
    getWeather(location);
  }, [ isImperial, coords ]);


  return (
    <>
      <div className="flex justify-center w-full h-2screen">
        {isLoading && <div className="w-full h-2screen absolute -z-10 bg-blue-600/40"></div>}
        {error && (
          <div
            id="app-cover"
            className="w-full h-2screen absolute z-20 bg-gradient-to-br from-blue-500/50 to-blue-300/50"
          ></div>
        )}
        <main className="w-full h-inherit overflow-y-scroll">
          <GetBackground data={{ cond: forecast.icon, error: error }} />
          <div className="h-fit flex flex-col items-center bg-center bg-no-repeat pt-10 gap-5 bg-fixed z-10 w-inherit">
            {error && <Error error={error} onClose={handleErrorClose}/>}
            <SearchForm
              onSubmit={(location) => {
                handleSubmit(location);
              }}
              handleUnitClick={handleUnitClick}
              isImperial={isImperial}
              handleLocation={handleLocation}
            />
            <div className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-1/3 3xl:w-1/3 flex flex-col gap-10">
              <CurrentWeather
                background={forecast.currentBackground}
                data={formatToCurrent(forecast.currentData)}
                low={forecast.dailyData[0] ? forecast.dailyData[0].low : null}
                high={forecast.dailyData[0] ? forecast.dailyData[0].high : null}
                location={location}
                isLoading={isLoading}
              />
              <HourlyWeather
                data={forecast.hourlyData}
                isLoading={isLoading}
                isDay={forecast.isDay}
              />
              <DailyWeather
                isDay={forecast.isDay}
                data={forecast.dailyData}
                isLoading={isLoading}
              />
              <CurrentDetails
                isImperial={isImperial}
                isDay={forecast.isDay}
                data={formatToDetails(forecast.details)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
