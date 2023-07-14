import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = process.env.REACT_APP_BASE_URL

const getWeatherData = (info, searchParams) => {
    // console.log(BASE_URL + "/" + info + API_KEY)
    // console.log(searchParams)
    // const data = axios.get(BASE_URL + "/" + info, {
        // params: {...searchParams, appid: API_KEY}
    // })
    // console.log(data)
    
    const data = {
        "coord": {
          "lon": 10.99,
          "lat": 44.34
        },
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 77.59,
          "feels_like": 78.06,
          "temp_min": 75.94,
          "temp_max": 80.42,
          "pressure": 1015,
          "humidity": 64,
          "sea_level": 1015,
          "grnd_level": 933
        },
        "visibility": 10000,
        "wind": {
          "speed": 0.62,
          "deg": 349,
          "gust": 1.18
        },
        "rain": {
          "1h": 3.16
        },
        "clouds": {
          "all": 100
        },
        "dt": 1661870592,
        "sys": {
          "type": 2,
          "id": 2075663,
          "country": "IT",
          "sunrise": 1661834187,
          "sunset": 1661882248
        },
        "timezone": 7200,
        "id": 3163858,
        "name": "Zocca",
        "cod": 200
    }   
    return data
}

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed, deg}
    } = data

    const {main: details, icon} = weather[0]

    return {
        lat,
        lon, 
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        humidity, 
        name, 
        dt, 
        country, 
        sunrise, 
        sunset, 
        details, 
        icon, 
        speed, 
        deg 
    }
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = /*await*/ getWeatherData('weather', searchParams)//.then(formatCurrentWeather)
    const x = formatCurrentWeather(formattedCurrentWeather)
    return x
}


export default getFormattedWeatherData