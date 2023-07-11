import getFormattedWeatherData from './api/weather-api'

import HourlyWeather from './components/HourlyWeather'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'

import astros from "./media/astros.jpg"
import CurrentDetails from './components/CurrentDetails'


function App() {
  const getWeather = async () => {
    const data = await getFormattedWeatherData({ q: "houston", units: "imperial"})
    console.log(data)
    console.log(new Date(data.sunrise * 1000).toLocaleDateString("en-US"), new Date(data.sunrise * 1000).toLocaleTimeString("en-US"))
    return data
  }

  getWeather()

  return (
    <div className="flex justify-center w-full h-full">
      <main className="fixed w-full h-full rounded-xl overflow-y-scroll">
        <div style={{ backgroundImage: `url(${astros})` }} className="h-2screen flex flex-col items-center rounded-xl bg-center bg-cover bg-no-repeat pt-28 gap-5 bg-fixed z-10 w-inherit">
          <div className=" w-4/5 md:w-3/4 xl:w-1/2 flex flex-col gap-10">
            <CurrentWeather />
            <HourlyWeather />
            <DailyWeather />
            <CurrentDetails />
          </div>
        </div>
      </main>
    </div>
  );
}



export default App;
