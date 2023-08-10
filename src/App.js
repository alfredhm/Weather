// Utility
import getFormattedWeatherData from "./services/weatherAPI";
import GetBackground from "./components/GetBackground";
import placesAPI from "./services/placesAPI";
import { formatToCurrent, formatToDetails } from "./util/formats";

// Components
import CurrentDetails from "./components/CurrentDetails";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";
import SearchForm from "./components/SearchForm";

// ReactJS
import { useEffect, useState, useRef } from "react";
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

  const [searches, setSearches] = useState([]);
  const [results, setResults] = useState(false);
  const [location, setLocation] = useState("houston");
  const [isImperial, setIsImperial] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let searchRef = useRef(searches);

  const handleSubmit = async (data) => {
    setLocation(data);
  };

  const handleChange = async (query) => {
    const input = await placesAPI(query);
    if (query === "") {
      setResults(false);
    } else if (input === "") {
      setResults(false);
      setError("No Search Results");
    } else {
      setSearches(input);
      setResults(true);
      searchRef.current = input;
    }
  };

  const handleUnitClick = () => {
    setIsImperial(!isImperial);
  };

  useEffect(() => {
    setLoading(true);
    const getWeather = async () => {
      try {
        const data = await getFormattedWeatherData({
          q: location,
          units: isImperial ? "imperial" : "metric",
        });

        setForecast({
          currentData: data.current,
          hourlyData: data.hourly,
          dailyData: data.daily,
          details: data.details,
          icon: data.current.icon,
          currentBackground: data.currentBackground,
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
  }, [location, isImperial, error]);

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
                setResults(false);
              }}
              onChange={async (data) => await handleChange(data)}
              handleUnitClick={handleUnitClick}
              searches={searches}
              results={results}
              isImperial={isImperial}
              isLoading={isLoading}
            />
            <div className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-1/3 3xl:w-1/3 flex flex-col gap-10">
              <CurrentWeather
                background={forecast.currentBackground}
                data={formatToCurrent(forecast.currentData)}
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
