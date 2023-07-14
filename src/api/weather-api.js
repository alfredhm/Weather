import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = process.env.REACT_APP_BASE_URL
const COORDS_URL = process.env.REACT_APP_COORDS_URL
const ONE_CALL_URL = process.env.REACT_APP_ONE_CALL_URL

const getCoords = async (location) => {
    const data = await axios.get(COORDS_URL, {
        params: {q: location, limit: 1, appid: API_KEY}
    })
    return {lat: data.data[0].lat, lon: data.data[0].lon}
}

const getWeatherData = async (info, searchParams) => {
    const data = axios.get(BASE_URL + "/" + info, {
        params: {...searchParams, appid: API_KEY}
    })

    return data
}

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, temp_min, temp_max},
        name,
        dt,
        sys: {country},
    } = data.data


    return {
        lat,
        lon, 
        temp, 
        temp_min, 
        temp_max,  
        name, 
        dt, 
        country,  
    }
}

const getOneCallData = async (lat, lon) => {
    const data = await axios.get(ONE_CALL_URL, {
        params: {units: "imperial", lat: lat, lon: lon, appid: API_KEY}
    })
    return data.data
}

const formatHourlyWeather = (data) => {
    const hourly = []

    for (let i = 0; i < 26; i++) {
        const time = new Date(data.hourly[i].dt * 1000).toLocaleTimeString("en-US", {hour: 'numeric', hour12: true}).toLowerCase().replace(" ", "")
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

const getFormattedWeatherData = async (searchParams) => {
    const coords = await getCoords(searchParams.q)
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)
    const formattedHourlyWeather = await getOneCallData(coords.lat, coords.lon).then(formatHourlyWeather)
    const formattedDetails = await getOneCallData(coords.lat, coords.lon).then(formatDetails)
    return { current: formattedCurrentWeather, hourly: formattedHourlyWeather, details: formattedDetails}
}


export default getFormattedWeatherData