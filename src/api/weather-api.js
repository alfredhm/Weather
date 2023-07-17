import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY
const BACKUP_API_KEY = process.env.REACT_APP_BACKUP_API_KEY
const BASE_URL = process.env.REACT_APP_BASE_URL
const COORDS_URL = process.env.REACT_APP_COORDS_URL
const ONE_CALL_URL = process.env.REACT_APP_ONE_CALL_URL

const getCoords = async (location) => {
    try {
        const data = await axios.get(COORDS_URL, {
            params: {q: location, limit: 1, appid: BACKUP_API_KEY}
        })
        return {lat: data.data[0].lat, lon: data.data[0].lon}
    } catch (err) {
        console.log(err)
        return err
    }

}

const getWeatherData = async (info, searchParams) => {
    try {
        const data = await axios.get(BASE_URL + "/" + info, {
            params: {...searchParams, appid: BACKUP_API_KEY}
        })
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}

const getOneCallData = async (lat, lon) => {
    try {
        const data = await axios.get(ONE_CALL_URL, {
            params: {units: "imperial", lat: lat, lon: lon, appid: BACKUP_API_KEY}
        })
        return data.data
    } catch (err) {
        console.log(err)
        return err
    }
}

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, temp_min, temp_max},
        name,
        dt,
        sys: {country},
        weather
    } = data.data

    const { icon } = weather[0]

    return {
        lat,
        lon, 
        temp, 
        temp_min, 
        temp_max,  
        name, 
        dt, 
        icon,
        country,  
    }
}

const formatHourlyWeather = (data) => {
    const hourly = []
    for (let i = 0; i < 26; i++) {
        const time = new Date(data.hourly[i].dt * 1000).toLocaleTimeString("en-US", {hour: 'numeric', hour12: true, timeZone: data.timezone}).toLowerCase().replace(" ", "")
        const temp = Math.round(parseFloat(data.hourly[i].temp))
        const {
            weather: [{
                icon
            }]
        } = data.hourly[i]

        const hour = {time, temp, icon}
        hourly.push(hour)
    }
    return hourly
}

const formatDailyWeather = (data) => {
    const daily = []

    for (let i = 0; i < 8; i++) {
        const weekday = new Date(data.daily[i].dt * 1000).toLocaleString("en-US", {weekday: 'short', timeZone: data.timezone})
        const icon = data.daily[i].weather[0].icon
        const { max, min } = data.daily[i].temp 

        const day = {day: weekday, icon: icon, high: Math.round(parseFloat(max)), low: Math.round(parseFloat(min))}
        daily.push(day)
    }
    return daily
}

const formatDetails = (data) => {
    const {
        sunrise,
        sunset,
        feels_like,
        pressure,
        humidity,
        uvi, 
        visibility,
        wind_speed,
        wind_deg,
        weather:[{
            main,
            description
        }]
    } = data.current

    return {
        sunrise,
        sunset,
        feels_like,
        pressure,
        humidity,
        uvi, 
        visibility,
        wind_speed,
        wind_deg,
        main,
        description
    }
}

const formatCondId = (data) => {
    return data.current.weather[0].id
}

const getFormattedWeatherData = async (searchParams) => {
    const coords = await getCoords(searchParams.q)
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)
    const oneCallData = await getOneCallData(coords.lat, coords.lon)
    const formattedDailyWeather = formatDailyWeather(oneCallData) 
    const formattedHourlyWeather = formatHourlyWeather(oneCallData) 
    const formattedDetails = formatDetails(oneCallData) 
    const condId = formatCondId(oneCallData)
    return { current: formattedCurrentWeather, hourly: formattedHourlyWeather, daily: formattedDailyWeather, details: formattedDetails, condId: condId}
}


export default getFormattedWeatherData