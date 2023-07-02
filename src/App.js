import getFormattedWeatherData from './api/weather-api'
import './App.css';

function App() {
  const getWeather = async () => {
    const data = await getFormattedWeatherData({ q: "houston", units: "imperial"})
    console.log(data)
  }
  
  getWeather()

  return (
    <div className="App">
    </div>
  );
}

export default App;
