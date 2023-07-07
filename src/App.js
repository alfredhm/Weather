import getFormattedWeatherData from './api/weather-api'

import HourlyWeather from './components/HourlyWeather'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'

import clouds from "./clouds.jpg"

function App() {
  const getWeather = async () => {
    const data = await getFormattedWeatherData({ q: "houston", units: "imperial"})
    console.log(data)
    console.log(new Date(data.sunrise * 1000).toLocaleDateString("en-US"), new Date(data.sunrise * 1000).toLocaleTimeString("en-US"))
    return data
  }

  return (
    <div className="flex justify-center w-full h-full">
      <main className=" m-10 fixed w-2/6 h-5/6 rounded-xl overflow-y-scroll">
        <div style={{ backgroundImage: `url(${clouds})` }} className="flex flex-col justify-normal rounded-xl bg-center bg-cover bg-no-repeat p-5 gap-5">
          <CurrentWeather />
          <HourlyWeather />
          <DailyWeather />
          <div className=" h-screen"></div>
        </div>
      </main>
    </div>
  );
}



export default App;
