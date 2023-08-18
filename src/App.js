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
  const [coords, setCoords] = useState({lat: "29.76", lng: "-95.36"})
  const [backgroundURL, setBackgroundURL] = useState("")
  const [isImperial, setIsImperial] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (data) => {
    setLocation(data.location)
    setCoords(data.coords)
    setBackgroundURL(data.background)
  };

  const handleUnitClick = () => {
    setIsImperial(!isImperial);
  };

  useEffect(() => {
    const getInitial = async (place_id, initial) => {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((position) => {
          setCoords({lat: position.coords.latitude, lng: position.coords.longitude})
        })
      }
      const data = await getSearchData(place_id, initial, coords)
      handleSubmit(data)
    }
    
    let x
    const geocoder = new window.google.maps.Geocoder()
    const latlngStr = coords.lat.toString() + " " + coords.lng.toString()
    const latlngSpl = latlngStr.split(" ", 2)
    const latlng = {
      lat: parseFloat(latlngSpl[0]),
      lng: parseFloat(latlngSpl[1])
    }
    geocoder
      .geocode({ location: latlng})
      .then((results) => {
        x = results.results[0].place_id.toString()
        getInitial(x, true)
      })
      .catch((e) => {
        console.error(e)
      })
    
  }, [])

  useEffect(() => {
    setLoading(true);
    const getWeather = async () => {
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
          currentBackground: backgroundURL,
          isDay: data.isDay,
        });

        setError("");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getWeather(location);
  }, [location, isImperial, backgroundURL]);

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
            {error && <Error error={error} onClick={setError("")} />}
            <SearchForm
              onSubmit={(location) => {
                handleSubmit(location);
              }}
              handleUnitClick={handleUnitClick}
              isImperial={isImperial}
              isLoading={isLoading}
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
