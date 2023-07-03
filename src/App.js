import getFormattedWeatherData from './api/weather-api'
import './App.css';

function App() {
  var data = null
  const getWeather = async () => {
    data = await getFormattedWeatherData({ q: "houston", units: "imperial"})
    console.log(data)
    console.log(new Date(data.sunrise * 1000).toLocaleDateString("en-US"), new Date(data.sunrise * 1000).toLocaleTimeString("en-US"))
  }

  getWeather()
  
  return (
    <div className="App">
      <main>
        <p className="text-3xl font-bold underline">Houston</p>
      </main>
    </div>
  );
}

export default App;
