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

// ReactJS
import { useEffect, useState } from "react";
import Error from "./components/Error";

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

  const [location, setLocation] = useState("Houston");
  const [coords, setCoords] = useState({lat: "29.76", lng: "-95.36"})
  const [backgroundURL, setBackgroundURL] = useState("https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUacShisXli5AviqymzdXf_vgsTi5M05wDJCw4UpAQZda9hH-yhjdFpSF4tYS5_0KVb1u-FFjMQ_btWUSpZNIh5TQEq9kQQfWfTCnp7z35KKwgiIoWPO8Q-9qclMycu0lHpuzfa9cjvIRtiaUXW_0YavfphxVqfAYIoDZ-Odq1hAhTJa5dXb&3u4032&5m1&2e1&callback=none&key=AIzaSyDDepM3u_BS2Oqb0DroW9SxC1M-PNwMru0&token=73715")
  const [isImperial, setIsImperial] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (data) => {
    setLocation(data.location)
    setCoords(data.coords)
    setBackgroundURL(data.background)
    console.log(data)
  };

  const handleUnitClick = () => {
    setIsImperial(!isImperial);
  };

  useEffect(() => {
    setLoading(true);
    const getWeather = async () => {
      try {
        const data = await getFormattedWeatherData({
          lat: coords.lat,
          lon: coords.lng,
          units: isImperial ? "imperial" : "metric",
        }, coords);

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
        if (
          err.message === "Cannot read properties of undefined (reading 'lat')"
        ) {
          setError("No Location Found");
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    };
    getWeather(location);
  }, [location, isImperial, error, backgroundURL, coords]);

  return (
    <>
      <div className="flex justify-center w-full h-2screen">
        {isLoading && <div className="w-full h-2screen absolute -z-10 bg-zinc-700"></div>}
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
                data={formatToCurrent(forecast.currentData, location)}
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
