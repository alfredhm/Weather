import getFormattedWeatherData from './api/weather-api'

import houston from './media/houston.jpg'

function App() {
  var data = null
  const getWeather = async () => {
    data = await getFormattedWeatherData({ q: "houston", units: "imperial"})
    console.log(data)
    console.log(new Date(data.sunrise * 1000).toLocaleDateString("en-US"), new Date(data.sunrise * 1000).toLocaleTimeString("en-US"))
  }

  getWeather()
  
  return (
    <div className="flex justify-center">
      <main className="mx-96 my-12 flex flex-col h-101 w-101 bg-blue-400 rounded-xl justify-normal">
        <HourlyWeather />
        <CurrentWeather />
      </main>
    </div>
  );
}

function HourlyWeather() {
  return (
    <div className="m-5 flex flex-row justify-between bg-blue-200 rounded-lg items-center p-2">
      <div className="flex flex-col">
        <p>Now</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
      <div className="flex flex-col">
        <p>1hr</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
      <div className="flex flex-col">
        <p>2hr</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
      <div className="flex flex-col">
        <p>3hr</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
      <div className="flex flex-col">
        <p>4hr</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
      <div className="flex flex-col">
        <p>5hr</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
      <div className="flex flex-col">
        <p>6hr</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
      <div className="flex flex-col">
        <p>7hr</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
      <div className="flex flex-col">
        <p>8hr</p>
        <p>Icon</p>
        <p>200°</p>
      </div>
    </div>
  );
}


function CurrentWeather() {
  return (
    <div className="m-5 flex flex-col h-40 justify-center bg-blue-300 rounded-xl">
          <div className="flex flex-row justify-center gap-3">
            <p>L:80°</p>
            <p className=" text-3xl">86°</p>
            <p>H:97°</p>
          </div>
          <div className="text-center">
            <p className="text-3xl">Houston</p>
          </div>
    </div>
  );
}

export default App;
